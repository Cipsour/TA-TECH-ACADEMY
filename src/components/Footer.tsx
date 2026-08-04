import React from 'react';
import { Sparkles, MapPin, PhoneCall, Mail, ShieldCheck, Award, QrCode } from 'lucide-react';
import { ZaloQrCode } from './ZaloQrCode';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenRegisterModal }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-base tracking-tight text-white">TA TECH ACADEMY</div>
                <div className="text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">Technology & AI Education for Everyone</div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Trung tâm khảo thí ủy quyền Certiport & Microsoft. Đào tạo công nghệ thông tin, lập trình Python, chứng chỉ IC3, MOS và ứng dụng AI cho học sinh, sinh viên và người đi làm.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Ủy Quyền Certiport</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Đối Tác Microsoft</span>
              </div>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white uppercase tracking-wider">Chương Trình Học</div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('courses')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Chứng chỉ IC3 Spark & Digital Literacy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('courses')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Luyện thi Chuyên gia MOS (Word/Excel)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('roadmap')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Lộ trình 72 buổi Python & Scratch THCS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('courses')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  AI Ứng Dụng Tăng Năng Suất
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Views */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white uppercase tracking-wider">Phân Hệ Hệ Thống</div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Trang Chủ Giới Thiệu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('lms')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Cổng Học Viên LMS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('admin')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Quản Trị CRM Tuyển Sinh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('architecture')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Kiến Trúc Hệ Thống & ERD
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact & Zalo QR */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white uppercase tracking-wider">Cơ Sở & Liên Hệ</div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Cơ sở chính:</strong> 47 Nguyễn Thái Bình, Bến Thành</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline / Zalo: <strong>0901315275</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>nguyentuananh.career@gmail.com</span>
              </li>
            </ul>

            {/* Zalo QR Code Thumbnail */}
            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <ZaloQrCode className="w-16 h-16 shrink-0" />
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-cyan-400" />
                    Quét Zalo Thầy Tuấn Anh
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">Mở camera quét mã tư vấn trực tiếp 24/7</div>
                  <a 
                    href="https://zalo.me/0901315275" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block text-[10px] font-bold text-cyan-400 hover:underline"
                  >
                    Chat Zalo 0901315275 &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <div>© {new Date().getFullYear()} TA Tech Academy. Tất cả quyền được bảo lưu.</div>
          <div className="flex gap-4">
            <span>Chính Sách Bảo Mật</span>
            <span>Điều Khoản Sử Dụng</span>
            <span>Quy Định Thi IC3 & MOS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
