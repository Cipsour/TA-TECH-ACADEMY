import express from "express";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

import { 
  getAllLeads, 
  createLead, 
  updateLead, 
  generateLeadsCsv, 
  Lead,
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

      res.status(201).json({
        success: true,
        message: "Registration received successfully! Our academic advisor will contact you within 15 minutes.",
        lead: newLead,
        zaloRedirectUrl: `https://zalo.me/0988888888?text=${encodeURIComponent(`Xin chào, tôi vừa đăng ký khóa học ${desiredCourse} cho học viên ${name} (SĐT: ${phone}).`)}`
      });
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
