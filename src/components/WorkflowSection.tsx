import React, { useState } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Compass, 
  GraduationCap, 
  Terminal, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Bot, 
  ShieldCheck, 
  Layers,
  Laptop,
  Flame,
  FileCheck
} from 'lucide-react';

interface WorkflowSectionProps {
  onOpenRegisterModal: (courseName?: string) => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenRegisterModal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: "1. Đánh Giá Năng Lực & Đăng Ký",
      shortTitle: "1. Đánh Giá AI",
      tag: "Đầu Vào",
      icon: UserCheck,
      color: "from-blue-500 to-cyan-400",
      textColor: "text-cyan-400",
      bgColor: "bg-blue-500/10 border-blue-500/30",
      description: "Học viên được kiểm tra tư duy logic, kỹ năng máy tính ban đầu và tư vấn lộ trình học phù hợp hoàn toàn miễn phí.",
      highlights: [
        "Bài test trắc nghiệm tư duy logic & kỹ năng số trực tuyến",
        "Tư vấn 1-1 với Thầy Nguyễn Tuấn Anh qua Zalo / Trực tuyến",
        "Xác định đúng mục tiêu: Chứng chỉ IC3, MOS, Lập trình hay AI"
      ],
      systemOutput: "Tự động tạo hồ sơ Lead trên hệ thống CRM & gửi Mã Ưu Đãi Tuyển Sinh"
    },
    {
      id: 2,
      title: "2. Thiết Kế Lộ Trình Cá Nhân Hóa",
      shortTitle: "2. Lộ Trình Cá Nhân",
      tag: "Thiết Kế",
      icon: Compass,
      color: "from-cyan-500 to-teal-400",
      textColor: "text-teal-300",
      bgColor: "bg-teal-500/10 border-teal-500/30",
      description: "Lộ trình đào tạo được may đo theo trình độ từng lứa tuổi (Tiểu học, THCS, THPT, Sinh viên & Người đi làm).",
      highlights: [
        "Học phần chia nhỏ từ cơ bản đến nâng cao (10-72 buổi)",
        "Lịch học linh hoạt: Học nhóm nhỏ hoặc Kèm 1-1",
        "Giáo trình chuẩn quốc tế Certiport & Microsoft kết hợp Thực chiến AI"
      ],
      systemOutput: "Cấp tài khoản Cổng Học Viên LMS & Kích hoạt lộ trình bài học"
    },
    {
      id: 3,
      title: "3. Học Tập Tương Tác Gamified LMS & AI 24/7",
      shortTitle: "3. Học Gamified & AI",
      tag: "Trải Nghiệm",
      icon: Laptop,
      color: "from-indigo-500 to-purple-400",
      textColor: "text-purple-300",
      bgColor: "bg-purple-500/10 border-purple-500/30",
      description: "Học qua video bài giảng ngắn, thực hành bài tập nhận điểm EXP, lên cấp và hỏi đáp với Trợ Lý AI Mentor 24/7.",
      highlights: [
        "Hệ thống Gamification: Làm bài tập tích EXP, mở khóa danh hiệu & Bảng xếp hạng",
        "Trợ Lý AI Trực Tuyến: Giải đáp thắc mắc lập trình & hướng dẫn sửa lỗi tức thì",
        "Video lý thuyết & File thực hành đính kèm trực quan"
      ],
      systemOutput: "Lưu tiến độ học tập real-time & tự động thông báo kết quả cho Phụ huynh/Học viên"
    },
    {
      id: 4,
      title: "4. Thực Hành Dự Án & Luyện Thi Thực Chiến",
      shortTitle: "4. Dự Án & Ôn Thi",
      tag: "Thực Chiến",
      icon: Terminal,
      color: "from-amber-500 to-orange-400",
      textColor: "text-amber-300",
      bgColor: "bg-amber-500/10 border-amber-500/30",
      description: "Xây dựng ứng dụng, game Scratch/Python thực tế và làm bài thi thử (Mock Exam) chuẩn cấu trúc Certiport/Microsoft.",
      highlights: [
        "Học viên tự làm Sản phẩm Công nghệ cá nhân (Game, App, Website, AI Prompt)",
        "Luyện đề thi IC3 Spark, IC3 GS6, MOS trên phần mềm giả lập thi thật",
        "Giảng viên chấm chữa chi tiết từng thao tác"
      ],
      systemOutput: "Đánh giá mức độ sẵn sàng thi quốc tế 100% trước khi đăng ký thi chính thức"
    },
    {
      id: 5,
      title: "5. Vinh Danh & Cấp Chứng Chỉ Quốc Tế",
      shortTitle: "5. Chứng Chỉ Quốc Tế",
      tag: "Đầu Ra",
      icon: Award,
      color: "from-emerald-500 to-green-400",
      textColor: "text-emerald-300",
      bgColor: "bg-emerald-500/10 border-emerald-500/30",
      description: "Sở hữu chứng chỉ tin học quốc tế giá trị toàn cầu, vinh danh tại Hall of Fame và xây dựng Profile ấn tượng.",
      highlights: [
        "Nhận chứng chỉ chính thức từ Certiport & Microsoft",
        "Trưng bày dự án xuất sắc tại Trưng Bày Sản Phẩm Học Viên",
        "Sẵn sàng hồ sơ du học, điểm ưu tiên xét tuyển & nâng cao năng suất công việc"
      ],
      systemOutput: "Cấp chứng nhận hoàn thành khóa học & lưu vết lịch sử trên LMS"
    }
  ];

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <section id="workflow-section" className="py-16 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Subtle Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Workflow Đào Tạo & Vận Hành Trực Quan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hành Trình Học Tập <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Đạt Chuẩn Quốc Tế</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Quy trình khép kín 5 bước được thiết kế tối ưu UX cho học viên và phụ huynh — từ đăng ký tư vấn đến khi cầm trên tay Chứng chỉ Quốc tế Certiport & Microsoft.
          </p>
        </div>

        {/* Workflow Visual Progress Bar / Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isActive 
                    ? `bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/30 scale-[1.02]` 
                    : `bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-400`
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isActive && (
                  <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md">
                    Đang xem
                  </span>
                )}

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 shadow-md ${
                  isActive ? `bg-gradient-to-tr ${step.color} text-white` : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className={`text-xs font-bold text-center line-clamp-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.shortTitle}
                </div>
                <span className={`text-[10px] mt-1 font-semibold ${isActive ? step.textColor : 'text-slate-500'}`}>
                  {step.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card Showcase */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentStepData.bgColor} ${currentStepData.textColor}`}>
                  {currentStepData.tag}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Bước {currentStepData.id} trên 5</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                  <span>{currentStepData.title}</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                  {currentStepData.description}
                </p>
              </div>

              {/* Feature Bullet Points */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Điểm Nổi Bật Của Bước Này:</div>
                {currentStepData.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* System Integration Badge */}
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center gap-3 text-xs">
                <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="font-bold text-cyan-300">Tương Tác Phân Hệ Hệ Thống: </span>
                  <span className="text-slate-300">{currentStepData.systemOutput}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenRegisterModal(`Đăng ký theo quy trình - Bước ${currentStepData.id}: ${currentStepData.title}`)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition-all transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Trải Nghiệm Quy Trình Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    &larr; Bước trước
                  </button>
                  <button
                    disabled={activeStep === 5}
                    onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    Bước tiếp &rarr;
                  </button>
                </div>
              </div>

            </div>

            {/* Right Visual Architecture Box (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Sơ Đồ Tương Tác Phân Hệ UX</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                    LIVE SYSTEM
                  </span>
                </div>

                {/* Workflow Architecture Card Flow */}
                <div className="space-y-2.5 text-xs">
                  <div className={`p-3 rounded-xl border transition-all ${activeStep === 1 ? 'bg-blue-950/80 border-cyan-400 font-bold' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-200">
                        <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>1. Cổng Đăng Ký Tuyển Sinh</span>
                      </span>
                      <span className="text-[10px] text-cyan-400">Web Public</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${activeStep === 2 ? 'bg-blue-950/80 border-teal-400 font-bold' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Compass className="w-3.5 h-3.5 text-teal-400" />
                        <span>2. Hệ Thống CRM Quản Lý Lead</span>
                      </span>
                      <span className="text-[10px] text-teal-300">Admin Portal</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${activeStep === 3 ? 'bg-purple-950/80 border-purple-400 font-bold' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Laptop className="w-3.5 h-3.5 text-purple-400" />
                        <span>3. Cổng Học Viên LMS & AI Mentor</span>
                      </span>
                      <span className="text-[10px] text-purple-300">Student Portal</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${activeStep === 4 ? 'bg-amber-950/80 border-amber-400 font-bold' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        <span>4. Thi Giả Lập Certiport & Microsoft</span>
                      </span>
                      <span className="text-[10px] text-amber-300">Mock Exam</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${activeStep === 5 ? 'bg-emerald-950/80 border-emerald-400 font-bold' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>5. Cấp Chứng Chỉ Quốc Tế Phê Duyệt</span>
                      </span>
                      <span className="text-[10px] text-emerald-300">Global Cert</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Key UX Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Chuyển Phân Hệ Tức Thì</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Người dùng có thể dễ dàng chuyển đổi giữa giao diện Website giới thiệu, Cổng LMS Học viên và Cổng CRM Quản trị chỉ với 1 click tại Header.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Trợ Lý AI Đa Năng</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tích hợp AI tư vấn khóa học thông minh cho phụ huynh & hỗ trợ học viên giải đáp kiến thức 24/7 trực tiếp trên website.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Đào Tạo Trực Tuyến & Hybrid</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Không giới hạn khoảng cách địa lý, học sinh ở bất kỳ đâu cũng có thể tham gia lớp học chất lượng cao và thi lấy chứng chỉ quốc tế.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
