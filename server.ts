import express from "express";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

import nodemailer from "nodemailer";
import { 
  getAllLeads, 
  createLead, 
  updateLead, 
  generateLeadsCsv, 
  getAllBookings,
  createBooking,
  updateBookingStatus,
  Lead,
  Booking,
  findUserByEmail,
  findUserById,
  verifyPassword
} from "./server/db";

const JWT_SECRET = process.env.JWT_SECRET || "ta_tech_academy_jwt_secret_key_2026";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
  exp: number;
}

// Hàm sinh token xác thực có chữ ký HMAC-SHA256 (Hạn 7 ngày)
function generateToken(payload: Omit<TokenPayload, 'exp'>): string {
  const fullPayload: TokenPayload = {
    ...payload,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  const data = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

// Hàm xác minh tính hợp lệ và thời hạn của token
function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [data, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    if (signature !== expectedSignature) return null;
    const payload: TokenPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Middleware xác thực và phân quyền truy cập
function requireAuth(allowedRoles?: string[]) {
  return (req: any, res: any, next: any) => {
    let token = '';
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.query && typeof req.query.token === 'string') {
      token = req.query.token; // Cho phép tải file qua URL query (như xuất CSV)
    }

    if (!token) {
      return res.status(401).json({ success: false, error: "Yêu cầu đăng nhập để truy cập tài nguyên này." });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại." });
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
      return res.status(403).json({ success: false, error: "Bạn không có quyền truy cập vào phân hệ này." });
    }

    req.user = payload;
    next();
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "TA TECH Academy Backend", timestamp: new Date() });
  });

  // API Đăng nhập
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Vui lòng nhập đầy đủ Email và Mật khẩu." });
      }

      const user = await findUserByEmail(email);
      if (!user || !verifyPassword(password, user.passwordHash)) {
        return res.status(401).json({ success: false, error: "Email hoặc mật khẩu không chính xác." });
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      });

      const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone
      };

      res.json({
        success: true,
        message: "Đăng nhập thành công!",
        token,
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Kiểm tra phiên đăng nhập hiện tại
  app.get("/api/auth/me", requireAuth(), async (req: any, res) => {
    try {
      const user = await findUserById(req.user.userId);
      if (!user) {
        return res.status(404).json({ success: false, error: "Không tìm thấy thông tin tài khoản." });
      }
      const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone
      };
      res.json({ success: true, user: safeUser });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get all leads (Bảo vệ: Chỉ ADMIN mới được xem danh sách tuyển sinh)
  app.get("/api/leads", requireAuth(['ADMIN']), async (req, res) => {
    try {
      const leads = await getAllLeads();
      res.json({ success: true, count: leads.length, leads });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Xuất danh sách Lead ra file CSV chuẩn UTF-8 (Bảo vệ: Chỉ ADMIN)
  app.get("/api/leads/export/csv", requireAuth(['ADMIN']), async (req, res) => {
    try {
      const csvData = await generateLeadsCsv();
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=leads-tuananhtinhoc-${new Date().toISOString().slice(0, 10)}.csv`);
      res.send(csvData);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

// Helper function to send instant Gmail notification to Teacher
async function sendGmailNotification(subject: string, htmlContent: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const receiver = process.env.NOTIFICATION_RECEIVER_EMAIL || user || "tuananh.tinhoc@gmail.com";

  if (!user || !pass) {
    console.log('[GMAIL NOTIFICATION] GMAIL_USER or GMAIL_APP_PASSWORD not configured in .env, skipping Gmail alert.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"TA TECH ACADEMY Notification" <${user}>`,
      to: receiver,
      subject: subject,
      html: htmlContent
    });
    console.log(`[GMAIL NOTIFICATION SUCCESS] Sent email alert to ${receiver}`);
  } catch (err: any) {
    console.error('[GMAIL NOTIFICATION ERROR]', err.message);
  }
}

// Helper function to send instant Telegram notification to Teacher's phone for Leads
async function sendTelegramBotNotification(lead: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('[BOT NOTIFICATION] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in .env');
    return;
  }

  const text = `🔔 *THÔNG BÁO HỌC VIÊN ĐĂNG KÝ MỚI!*\n\n` +
    `👤 *Họ tên:* ${lead.name}\n` +
    `📞 *SĐT:* ${lead.phone}\n` +
    `📧 *Email:* ${lead.email || 'Chưa cung cấp'}\n` +
    `🏫 *Khối lớp:* ${lead.grade || 'Mọi độ tuổi'}\n` +
    `📚 *Khóa học:* ${lead.desiredCourse}\n` +
    `📝 *Ghi chú:* ${lead.notes || 'Không có'}\n` +
    `⏱ *Thời gian:* ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
    `👉 *Chat Zalo ngay với học viên:* https://zalo.me/${lead.phone.replace(/[^0-9]/g, '')}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });
    const result = await response.json();
    if (result.ok) {
      console.log(`[BOT NOTIFICATION SUCCESS] Sent lead alert for ${lead.name} (${lead.phone}) to Telegram.`);
    } else {
      console.error('[BOT NOTIFICATION FAILED]', result);
    }
  } catch (err: any) {
    console.error('[BOT NOTIFICATION ERROR]', err.message);
  }
}

// Helper function to send instant Telegram notification for Bookings
async function sendTelegramBookingNotification(booking: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const formatText = booking.format === 'ONLINE' ? '💻 Học Online qua Zoom' : '🏫 Học Trực tiếp tại Trung tâm';

  const text = `📅 *LỊCH HẸN ĐÁNH GIÁ NĂNG LỰC 1-1 MỚI!*\n\n` +
    `👤 *Phụ huynh/Học viên:* ${booking.name}\n` +
    `📞 *SĐT:* ${booking.phone}\n` +
    `📧 *Email:* ${booking.email || 'Chưa cung cấp'}\n` +
    `🏫 *Khối lớp:* ${booking.grade || 'Mọi độ tuổi'}\n` +
    `📚 *Khóa học quan tâm:* ${booking.desiredCourse}\n` +
    `🗓 *Ngày hẹn:* ${booking.bookingDate}\n` +
    `⏰ *Khung giờ:* ${booking.timeSlot}\n` +
    `📍 *Hình thức:* ${formatText}\n` +
    `📝 *Ghi chú:* ${booking.notes || 'Không có'}\n` +
    `⏱ *Thời gian đặt:* ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n\n` +
    `👉 *Chat Zalo xác nhận lịch:* https://zalo.me/${booking.phone.replace(/[^0-9]/g, '')}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });
  } catch (err: any) {
    console.error('[BOT BOOKING NOTIFICATION ERROR]', err.message);
  }
}

  // Create new lead (Public Registration Form - lưu trữ vĩnh viễn)
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, phone, email, grade, desiredCourse, notes, source } = req.body;
      
      if (!name || !phone || !desiredCourse) {
        return res.status(400).json({ success: false, error: "Name, phone, and desired course are required." });
      }

      const newLead = await createLead({
        name,
        phone,
        email: email || "",
        grade: grade || "General",
        desiredCourse,
        notes: notes || "",
        source: source || 'FORM'
      });

      // Tự động gửi tin nhắn báo về điện thoại Thầy ngay lập tức qua Telegram Bot & Gmail
      sendTelegramBotNotification(newLead).catch(e => console.error("Notification trigger error:", e));

      const emailSubject = `🔔 [TA TECH ACADEMY] Đăng ký mới từ ${name} (${phone})`;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; borderRadius: 12px;">
          <h2 style="color: #38bdf8;">🔔 THÔNG BÁO HỌC VIÊN ĐĂNG KÝ MỚI</h2>
          <hr style="border-color: #334155;" />
          <p><strong>👤 Họ tên:</strong> ${name}</p>
          <p><strong>📞 Số điện thoại:</strong> ${phone}</p>
          <p><strong>📧 Email:</strong> ${email || 'Chưa cung cấp'}</p>
          <p><strong>🏫 Khối lớp:</strong> ${grade || 'General'}</p>
          <p><strong>📚 Khóa học đăng ký:</strong> ${desiredCourse}</p>
          <p><strong>📝 Ghi chú:</strong> ${notes || 'Không có'}</p>
          <p><strong>⏱ Thời gian:</strong> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
          <br />
          <a href="https://zalo.me/${phone.replace(/[^0-9]/g, '')}" style="background-color: #0284c7; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">👉 Chat Zalo Với Học Viên</a>
        </div>
      `;
      sendGmailNotification(emailSubject, emailHtml).catch(e => console.error("Gmail trigger error:", e));

      res.status(201).json({
        success: true,
        message: "Registration received successfully! Our academic advisor will contact you within 15 minutes.",
        lead: newLead,
        zaloRedirectUrl: `https://zalo.me/0901315275?text=${encodeURIComponent(`Xin chào Thầy Tuấn Anh, tôi vừa đăng ký khóa học ${desiredCourse} cho học viên ${name} (SĐT: ${phone}).`)}`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET all Bookings (Admin CRM)
  app.get("/api/bookings", requireAuth(['ADMIN']), async (req, res) => {
    try {
      const bookings = await getAllBookings();
      res.json({ success: true, bookings });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST create new Booking slot
  app.post("/api/bookings", async (req, res) => {
    try {
      const { name, phone, email, grade, desiredCourse, bookingDate, timeSlot, format, notes } = req.body;

      if (!name || !phone || !desiredCourse || !bookingDate || !timeSlot) {
        return res.status(400).json({ success: false, error: "Name, phone, course, date and timeSlot are required." });
      }

      const newBooking = await createBooking({
        name,
        phone,
        email: email || "",
        grade: grade || "General",
        desiredCourse,
        bookingDate,
        timeSlot,
        format: format || "ONLINE",
        notes: notes || ""
      });

      // Tự động bắn thông báo tức thì Telegram + Gmail
      sendTelegramBookingNotification(newBooking).catch(e => console.error("Telegram booking error:", e));

      const formatText = format === 'ONLINE' ? '💻 Học Online qua Zoom' : '🏫 Học Trực tiếp tại Trung tâm';
      const emailSubject = `📅 [LỊCH HẸN] Đặt lịch Đánh giá Năng lực từ ${name} (${bookingDate} ${timeSlot})`;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 12px;">
          <h2 style="color: #f59e0b;">📅 LỊCH HẸN ĐÁNH GIÁ NĂNG LỰC 1-1 MỚI</h2>
          <hr style="border-color: #334155;" />
          <p><strong>👤 Phụ huynh/Học viên:</strong> ${name}</p>
          <p><strong>📞 Số điện thoại:</strong> ${phone}</p>
          <p><strong>📧 Email:</strong> ${email || 'Chưa cung cấp'}</p>
          <p><strong>🏫 Khối lớp:</strong> ${grade || 'General'}</p>
          <p><strong>📚 Khóa học quan tâm:</strong> ${desiredCourse}</p>
          <p><strong>🗓 Ngày hẹn:</strong> ${bookingDate}</p>
          <p><strong>⏰ Khung giờ:</strong> ${timeSlot}</p>
          <p><strong>📍 Hình thức:</strong> ${formatText}</p>
          <p><strong>📝 Ghi chú:</strong> ${notes || 'Không có'}</p>
          <br />
          <a href="https://zalo.me/${phone.replace(/[^0-9]/g, '')}" style="background-color: #2563eb; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">👉 Chat Zalo Xác Nhận Lịch Hẹn</a>
        </div>
      `;
      sendGmailNotification(emailSubject, emailHtml).catch(e => console.error("Gmail booking error:", e));

      res.status(201).json({
        success: true,
        message: "Booking appointment scheduled successfully!",
        booking: newBooking
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PATCH update booking status
  app.patch("/api/bookings/:id", requireAuth(['ADMIN']), async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const updated = await updateBookingStatus(id, status, notes);
      if (!updated) {
        return res.status(404).json({ success: false, error: "Booking not found." });
      }
      res.json({ success: true, booking: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Update lead status (Admin CRM - bảo vệ: Chỉ ADMIN)
  app.patch("/api/leads/:id", requireAuth(['ADMIN']), async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const updated = await updateLead(id, { status, notes });
      if (!updated) {
        return res.status(404).json({ success: false, error: "Lead not found." });
      }

      res.json({ success: true, lead: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // AI Learning Assistant Advisor Endpoint (Gemini API Integration)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { prompt, studentAge, goal } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Fallback intelligent response if key is missing or default placeholder
        return res.json({
          reply: `Based on a student interested in "${goal || 'technology & AI'}" (Age/Grade: ${studentAge || 'All ages'}), here is our recommended roadmap:\n\n1. **Foundations**: Start with IC3 Spark or Scratch Logic for visual problem solving.\n2. **Core Programming**: Advance into Python & Algorithm fundamentals (16 sessions).\n3. **Applied AI**: Master Prompt Engineering, ChatGPT tools, and Python AI automation.\n\nWould you like to schedule a free 1-on-1 assessment with our master teacher?`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are TA TECH Academy's AI Academic Consultant. Your goal is to provide concise, friendly, encouraging advice for parents and students choosing Physics & IT/AI courses (Physics / Vật Lý, IC3 Spark, MOS, Python, Scratch, Algorithms, Applied AI). Keep answers clear and actionable. Recommend specific courses based on student age/goals.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\nUser Question: ${prompt}\nStudent Context: Age/Grade = ${studentAge || 'Not specified'}, Goal = ${goal || 'Learn Physics/AI/IT'}`
      });

      res.json({ reply: response.text || "Thank you for your question! We recommend exploring our Physics & IT/AI Roadmap for maximum future readiness." });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.json({
        reply: "TA TECH Academy recommends starting with our Physics / Vật Lý roadmap, Primary/Middle School Scratch & Python, or Applied AI for Adults. Fill out our quick form for a personalized consultation!"
      });
    }
  });

  // Phục vụ thư mục hình ảnh tĩnh assets/images
  app.use('/assets/images', express.static(path.join(process.cwd(), 'assets/images')));
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TA TECH Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
