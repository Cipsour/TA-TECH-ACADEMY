import React from 'react';
import { Sparkles, Building2, Award, Users, ShieldCheck, MapPin, PhoneCall, Mail, UserCheck, QrCode } from 'lucide-react';
import { ZaloQrCode } from './ZaloQrCode';

interface AboutUsProps {
  onOpenRegisterModal: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenRegisterModal }) => {
  return (
    <div className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Giới Thiệu Về TA Tech Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Technology & AI Education <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">for Everyone</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Giúp học viên phát triển kỹ năng số tương lai. TA Tech Academy đồng hành cùng học sinh từ tiểu học, THCS đến sinh viên và người đi làm trong hành trình làm chủ Công nghệ thông tin & Trí tuệ nhân tạo (AI).
          </p>
        </div>

        {/* Founder / Key Instructor Spotlight */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shrink-0 shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center text-cyan-400">
                <UserCheck className="w-16 h-16" />
              </div>
            </div>

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Giảng Viên Sáng Lập & Chuyên Gia Đào Tạo</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Thầy Nguyễn Tuấn Anh</h3>
              <p className="text-cyan-300 text-xs font-medium">
                Giáo viên Tin học tại trường Quốc tế Á Châu (Asian International School)
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Chuyên gia giàu kinh nghiệm thực chiến trong việc giảng dạy Tin học ứng dụng, Lập trình Scratch, Python và Công cụ AI thế hệ mới. Lộ trình được thiết kế bám sát thực tế, sinh động, dễ tiếp thu và giúp học viên phát huy tối đa tư duy sáng tạo.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Zalo: 0901315275
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> nguyentuananh.career@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Chứng Chỉ Quốc Tế</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Luyện thi cấp tốc 10 buổi sở hữu các chứng chỉ uy tín thế giới: IC3 Spark, IC3 Digital Literacy và MOS (Word/Excel) từ Certiport & Microsoft.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">LMS Game Hóa (Gamification)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Làm nhiệm vụ, nhận điểm EXP, thăng cấp, vinh danh trên Bảng xếp hạng (Hall of Fame) và tương tác với AI Mentor 24/7.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Lộ Trình 72 Buổi Toàn Diện</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chương trình chuẩn cho học sinh THCS kéo dài 72 buổi (90 phút/buổi) gồm 7 học phần từ tư duy logic đến ứng dụng AI.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">AI Thực Chiến (Applied AI)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trang bị cho sinh viên & người đi làm kỹ năng Prompt Engineering, ChatGPT, Gemini, Claude và Tự động hóa quy trình.
            </p>
          </div>
        </div>

        {/* Facilities & Campuses */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>Cơ Sở Đào Tạo & Hình Thức Học Trực Tuyến</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lớp học trực tiếp tại trung tâm hoặc trực tuyến tương tác qua hệ thống Gamified LMS.
              </p>
            </div>
            <button
              onClick={onOpenRegisterModal}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg cursor-pointer shrink-0"
            >
              Đăng Ký Tư Vấn Trực Tiếp
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-sm text-cyan-400">Cơ Sở Chính</div>
              <div className="text-slate-200 font-medium">47 Nguyễn Thái Bình, Phường Bến Thành, Quận 1, TP. HCM</div>
              <div className="text-slate-400 text-[11px]">Hotline / Zalo: 0901315275 • Email: nguyentuananh.career@gmail.com</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-sm text-cyan-400">Hệ Thống Học Trực Tuyến Gamified LMS</div>
              <div className="text-slate-200 font-medium">Làm nhiệm vụ nhận EXP, Bảng xếp hạng & AI Mentor tương tác 24/7</div>
              <div className="text-slate-400 text-[11px]">Lớp nhóm nhỏ hoặc học 1-1 trực tiếp với Giảng viên</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <ZaloQrCode className="w-20 h-20 shrink-0" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-cyan-400 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" />
                  Mã QR Zalo 0901315275
                </div>
                <div className="text-slate-300 text-[11px]">Quét mã Zalo trao đổi trực tiếp với Thầy Nguyễn Tuấn Anh.</div>
                <a 
                  href="https://zalo.me/0901315275" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block text-[11px] font-bold text-amber-400 hover:underline"
                >
                  MoChatZalo.me &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
