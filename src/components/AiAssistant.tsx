import React, { useState } from 'react';
import { Sparkles, Bot, Send, User } from 'lucide-react';

interface AiAssistantProps {
  onOpenRegisterModal: (courseName?: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ onOpenRegisterModal }) => {
  const [prompt, setPrompt] = useState('');
  const [studentAge, setStudentAge] = useState('Học sinh Lớp 6-9');
  const [goal, setGoal] = useState('Học Lập trình Python & AI');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: "Xin chào! Tôi là Trợ lý AI Tư vấn Giáo dục của Học viện Nexus. Hãy chia sẻ độ tuổi, khối lớp hoặc mục tiêu học tập của bạn, tôi sẽ đề xuất lộ trình IT & AI tối ưu nhất!"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userText = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          studentAge,
          goal
        })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Học viện Nexus khuyến nghị bạn bắt đầu với Lộ trình Lập trình & AI THCS 72 buổi hoặc Khóa luyện thi Chứng chỉ IC3 Spark! Bạn có muốn đăng ký một buổi học thử 1-1 miễn phí không?"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "Học sinh Lớp 7 nên bắt đầu học khóa nào trước?",
    "Sự khác biệt giữa chứng chỉ IC3 Spark và IC3 Digital Literacy?",
    "Lộ trình 72 buổi giúp học sinh chuẩn bị gì cho kỷ nguyên AI?",
    "Khóa AI Ứng dụng dành cho sinh viên và người đi làm học những gì?"
  ];

  return (
    <section id="ai-center" className="py-20 bg-slate-900 border-b border-slate-800 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trợ Lý AI Tư Vấn Học Tập</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Tư Vấn Lộ Trình <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tự Động Bằng AI</span>
          </h2>
          <p className="text-slate-300 text-sm">
            Tích hợp Gemini AI API giúp phân tích mục tiêu học tập và thiết kế lộ trình đào tạo tối ưu nhất.
          </p>
        </div>

        {/* Chat Interface Box */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
          
          {/* Chat Header */}
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-white">Trợ Lý AI Nexus Consultation</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Trực tuyến • Gemini 2.5 Flash Engine</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenRegisterModal()}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md cursor-pointer"
            >
              Gặp Tư Vấn Viên Người Bật
            </button>
          </div>

          {/* Quick Context Selectors */}
          <div className="px-6 py-2.5 bg-slate-900/50 border-b border-slate-800/60 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="text-slate-500 font-semibold text-[11px]">Thông tin học viên:</span>
            <select
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="Học sinh Tiểu học (Lớp 1-5)">Tiểu học (Lớp 1-5)</option>
              <option value="Học sinh Lớp 6-9">THCS (Lớp 6-9)</option>
              <option value="Học sinh THPT">THPT (Lớp 10-12)</option>
              <option value="Sinh viên / Người đi làm">Sinh viên / Người đi làm</option>
            </select>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="Học Lập trình Python & AI">Mục tiêu: Học Python & AI</option>
              <option value="Thi Chứng chỉ IC3 Spark">Mục tiêu: Thi Chứng chỉ IC3</option>
              <option value="Luyện thi Chuyên gia MOS">Mục tiêu: Luyện thi MOS Excel</option>
              <option value="Làm chủ AI Tăng năng suất">Mục tiêu: Làm chủ Công cụ AI</option>
            </select>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-900/50 text-cyan-400 border border-blue-800 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>AI đang phân tích thông tin và soạn lộ trình...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-2 bg-slate-900/40 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 font-semibold">Gợi ý câu hỏi:</span>
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setPrompt(q)}
                className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 shrink-0 cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
            <input
              type="text"
              placeholder="Nhập câu hỏi về khóa học, lộ trình hoặc lịch học..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>Hỏi AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
