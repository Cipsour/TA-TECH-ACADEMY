import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  grade?: string;
  desiredCourse: string;
  notes?: string;
  source: 'FORM' | 'ZALO' | 'LANDING';
  status: 'NEW' | 'CONTACTED' | 'CONVERTED';
  createdAt: string;
}

// In-memory data store seeded with realistic data
const leadsStore: Lead[] = [
  {
    id: "lead-101",
    name: "Nguyen Van An",
    phone: "0912345678",
    email: "an.nguyen@gmail.com",
    grade: "Grade 7 (Secondary)",
    desiredCourse: "Middle School Programming Roadmap (Python & Scratch)",
    notes: "Parent looking for weekend classes for kid interested in robotics.",
    source: "FORM",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "lead-102",
    name: "Tran Thi Mai",
    phone: "0987654321",
    email: "mai.tran@office.com",
    grade: "Working Professional",
    desiredCourse: "Applied AI & Prompt Engineering for Productivity",
    notes: "Wants corporate training package or evening group session.",
    source: "ZALO",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "lead-103",
    name: "Le Hoang Nam",
    phone: "0901122334",
    email: "nam.le@student.edu.vn",
    grade: "University Senior",
    desiredCourse: "MOS Certification (Word, Excel, PowerPoint)",
    notes: "Needs certification before graduation deadline next month.",
    source: "FORM",
    status: "CONVERTED",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Nexus IT & AI Academy Backend", timestamp: new Date() });
  });

  // Get all leads (Admin CRM)
  app.get("/api/leads", (req, res) => {
    res.json({ success: true, count: leadsStore.length, leads: leadsStore });
  });

  // Create new lead (Public Registration Form)
  app.post("/api/leads", (req, res) => {
    const { name, phone, email, grade, desiredCourse, notes, source } = req.body;
    
    if (!name || !phone || !desiredCourse) {
      return res.status(400).json({ success: false, error: "Name, phone, and desired course are required." });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email: email || "",
      grade: grade || "General",
      desiredCourse,
      notes: notes || "",
      source: source || 'FORM',
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    leadsStore.unshift(newLead);

    res.status(201).json({
      success: true,
      message: "Registration received successfully! Our academic advisor will contact you within 15 minutes.",
      lead: newLead,
      zaloRedirectUrl: `https://zalo.me/0988888888?text=${encodeURIComponent(`Xin chào, tôi vừa đăng ký khóa học ${desiredCourse} cho học viên ${name} (SĐT: ${phone}).`)}`
    });
  });

  // Update lead status (Admin CRM)
  app.patch("/api/leads/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const lead = leadsStore.find(l => l.id === id);

    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found." });
    }

    if (status && ['NEW', 'CONTACTED', 'CONVERTED'].includes(status)) {
      lead.status = status;
    }

    res.json({ success: true, lead });
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
      const systemInstruction = `You are Nexus Academy's AI Academic Consultant. Your goal is to provide concise, friendly, encouraging advice for parents and students choosing IT & AI courses (IC3 Spark, MOS, Python, Scratch, Algorithms, Applied AI). Keep answers clear and actionable. Recommend specific courses based on student age/goals.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\nUser Question: ${prompt}\nStudent Context: Age/Grade = ${studentAge || 'Not specified'}, Goal = ${goal || 'Learn AI/IT'}`
      });

      res.json({ reply: response.text || "Thank you for your question! We recommend exploring our Python & AI Roadmap for maximum future readiness." });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.json({
        reply: "Nexus Academy recommends starting with our Primary/Middle School Scratch & Python roadmap or Applied AI for Adults. Fill out our quick form for a personalized consultation!"
      });
    }
  });

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
    console.log(`Nexus Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
