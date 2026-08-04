import React from 'react';
import { Award, Laptop, Users, Sparkles, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenRegisterModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenRegisterModal }) => {
  const features = [
    {
      icon: Award,
      title: "Khung Chuẩn Quốc Tế",
      description: "Chương trình đào tạo sát chuẩn thi chứng chỉ toàn cầu Certiport IC3 Spark, IC3 Digital Literacy và Microsoft Office Specialist (MOS).",
      badge: "Chuẩn Toàn Cầu",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Laptop,
      title: "100% Thực Hành Dự Án",
      description: "Học sinh học thông qua việc tự chế tạo sản phẩm thật: Game 2D Scratch, phần mềm Python, và Bot AI tích hợp Gemini API.",
      badge: "Học Theo Dự Án",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Đội Ngũ Giảng Viên Giỏi",
      description: "Giảng dạy bởi kỹ sư phần mềm & chuyên gia sư phạm. Sĩ số nhỏ tối đa 10 học sinh/lớp để theo sát từng em.",
      badge: "Kèm Cặp 1-1",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Sparkles,
      title: "Tích Hợp Công Nghệ AI",
      description: "Học viên được cấp quyền truy cập Trợ lý AI đồng hành chuẩn Gemini API để sửa lỗi code, gợi ý giải thuật và tối ưu bài tập.",
      badge: "Trợ Lý AI Đồng Hành",
      color: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            Vì sao chọn Học viện TA TECH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Phương Pháp Học <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Xây Dựng Năng Lực Thực Bằng</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Chúng tôi loại bỏ lý thuyết suông. 4 trụ cột cốt lõi kết hợp chứng chỉ quốc tế và kỹ năng lập trình AI thực chiến.
          </p>
        </div>

        {/* 4 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl bg-slate-950 border border-slate-800 p-6 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {feature.description}
                    </p>
                  </div>

                </div>

                <div className="pt-6 border-t border-slate-900 mt-6 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Khám phá Chương trình</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-white">Chưa rõ khóa học nào phù hợp nhất với con hoặc bản thân?</div>
            <div className="text-xs text-slate-400">Đăng ký ngay buổi test năng lực 20 phút miễn phí cùng Giám đốc Đào tạo.</div>
          </div>
          <button
            onClick={onOpenRegisterModal}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            Đặt Lịch Đánh Giá Miễn Phí
          </button>
        </div>

      </div>
    </section>
  );
};
