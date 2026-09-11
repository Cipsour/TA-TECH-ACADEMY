import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Bot, 
  Star
} from 'lucide-react';

interface HeroProps {
  onOpenRegisterModal: (courseName?: string) => void;
  onOpenBookingModal?: (courseName?: string) => void;
  onNavigateRoadmap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegisterModal,
  onOpenBookingModal,
  onNavigateRoadmap
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 border-b border-slate-800">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-medium backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>TA Tech Academy • Technology & AI Education for Everyone</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Phát Triển Kỹ Năng Số & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Trí Tuệ Nhân Tạo AI
              </span> Tương Lai
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Trang bị tư duy công nghệ chuẩn quốc tế, chứng chỉ Certiport IC3/MOS và lộ trình Lập trình 72 buổi cùng Thầy Nguyễn Tuấn Anh (Giáo viên Tin học trường Quốc tế Á Châu).
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Thực hành Bài tập Chuẩn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Thi Chứng chỉ Quốc tế IC3 & MOS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Lộ trình Lập trình AI 72 Buổi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Lớp nhỏ Tối đa 10 Học sinh</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => (onOpenBookingModal ? onOpenBookingModal("Đánh giá Năng lực & Học thử AI Miễn phí") : onOpenRegisterModal())}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Đặt Lịch Test Năng Lực 1-1</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenRegisterModal()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Đăng Ký Học Thử</span>
              </button>

              <button
                onClick={onNavigateRoadmap}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Xem Lộ Trình</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Student" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-white font-semibold ml-1">4.95/5</span>
                </div>
                <div>Được tin tưởng bởi 1,200+ Phụ huynh & Học viên</div>
              </div>
            </div>

          </div>

          {/* Right Column Interactive Visual Card with Floating Tech Badges */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  TA_TECH_AI_ENGINE_V2.5
                </span>
              </div>

              {/* Course Live Preview Card */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80" 
                  alt="Học sinh lập trình" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-[11px] font-semibold text-white">
                    Tiểu học - THPT & Người đi làm
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900/90 text-[10px] font-mono text-slate-300">
                    4 Lộ trình Cốt lõi
                  </span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-lg font-bold text-cyan-400">98%</div>
                  <div className="text-[10px] text-slate-400">Tỷ lệ Đỗ Chứng chỉ</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-lg font-bold text-blue-400">72</div>
                  <div className="text-[10px] text-slate-400">Buổi Học Lập trình</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-lg font-bold text-amber-400">Zalo</div>
                  <div className="text-[10px] text-slate-400">Tư vấn 1-1 Nhanh</div>
                </div>
              </div>

            </div>

            {/* Floating Tech Badges */}
            <div className="absolute -top-6 -left-6 bg-slate-900/95 border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Python 3.12</div>
                <div className="text-[10px] text-slate-400">Thuật toán & AI</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-slate-900/95 border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce [animation-duration:5s]">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Gemini AI Agent</div>
                <div className="text-[10px] text-slate-400">Prompt Engineering</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
