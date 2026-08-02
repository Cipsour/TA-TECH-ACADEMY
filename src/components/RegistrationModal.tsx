import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  QrCode, 
  User, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { ZaloQrCode } from './ZaloQrCode';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseName?: string;
  onLeadCreated?: (lead: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultCourseName,
  onLeadCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    grade: 'THCS (Lớp 6 - Lớp 9)',
    desiredCourse: defaultCourseName || COURSES_DATA[1].title,
    notes: '',
    source: 'FORM'
  });

  useEffect(() => {
    if (defaultCourseName) {
      setFormData(prev => ({ ...prev, desiredCourse: defaultCourseName }));
    }
  }, [defaultCourseName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        if (onLeadCreated) onLeadCreated(data.lead);
        setStep(3); // Success & Zalo QR screen
      } else {
        alert(data.error || 'Đăng ký thất bại, vui lòng thử lại.');
      }
    } catch (err) {
      // Fallback local lead simulation
      const mockLead = {
        id: `lead-${Date.now()}`,
        ...formData,
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      if (onLeadCreated) onLeadCreated(mockLead);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleZaloChat = () => {
    const text = encodeURIComponent(`Xin chào TA Tech Academy (Thầy Tuấn Anh), tôi vừa đăng ký tư vấn khóa học "${formData.desiredCourse}" cho học viên ${formData.name} (SĐT: ${formData.phone}).`);
    window.open(`https://zalo.me/0901315275?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cổng Đăng Ký Tuyển Sinh TA TECH</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {step === 3 ? "Đăng Ký Thành Công!" : "Đăng Ký Học Thử Miễn Phí"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {step === 3 
              ? "Thông tin của bạn đã được lưu vào hệ thống CRM. Quét mã Zalo QR dưới đây để được Giám đốc Đào tạo tư vấn trực tiếp."
              : "Điền thông tin ngắn dưới đây để nhận lịch đánh giá năng lực & tham gia buổi học thử 1-1."
            }
          </p>
        </div>

        {/* Step Progress Bar */}
        {step < 3 && (
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>1</div>
              <span>Thông Tin Liên Hệ</span>
            </div>
            <div className="h-[1px] flex-1 bg-slate-800" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>2</div>
              <span>Khóa Học & Ghi Chú</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Họ và Tên (Học sinh hoặc Phụ huynh) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Số Điện Thoại / Zalo <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <PhoneCall className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0988888888"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Địa chỉ Email (Không bắt buộc)
              </label>
              <input
                type="email"
                placeholder="an.nguyen@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
              />
            </div>

            <button
              onClick={() => {
                if (!formData.name || !formData.phone) {
                  alert("Vui lòng nhập cả Họ tên và Số điện thoại.");
                  return;
                }
                setStep(2);
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Tiếp theo: Chọn Khóa Học</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Khối Lớp / Độ Tuổi
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white"
              >
                <option value="Tiểu học (Lớp 1 - 5)">Tiểu học (Lớp 1 - Lớp 5)</option>
                <option value="THCS (Lớp 6 - 9)">Trung học Cơ sở (Lớp 6 - Lớp 9)</option>
                <option value="THPT (Lớp 10 - 12)">Trung học Phổ thông (Lớp 10 - Lớp 12)</option>
                <option value="Sinh viên Đại học">Sinh viên Đại học</option>
                <option value="Người đi làm">Người đi làm</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Khóa Học Quan Tâm <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.desiredCourse}
                onChange={(e) => setFormData({ ...formData, desiredCourse: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white font-medium"
              >
                {COURSES_DATA.map(c => (
                  <option key={c.id} value={c.title}>
                    {c.title} ({c.duration})
                  </option>
                ))}
                <option value="Tư vấn Lộ trình Cá nhân hóa">Chưa rõ - Yêu cầu Test năng lực cá nhân</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ghi Chú Hoặc Khung Giờ Mong Muốn
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Mong muốn học lớp thứ 7 & Chủ nhật tại cơ sở Cầu Giấy..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Đang lưu vào CRM..." : "Hoàn Tất Đăng Ký"}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success & Zalo Direct QR Code */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400">Thông tin đã ghi nhận trong hệ thống CRM:</div>
              <div className="font-bold text-sm text-cyan-400">{formData.name} ({formData.phone})</div>
              <div className="text-slate-300 font-medium">{formData.desiredCourse}</div>
            </div>

            {/* Zalo Direct QR Code Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950 to-slate-950 border border-blue-800/80 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px]">
                <QrCode className="w-3.5 h-3.5 text-white" />
                <span className="text-white">MÃ QR ZALO TRỰC TIẾP THẦY TUẤN ANH</span>
              </div>

              {/* High-Res SVG Zalo QR Code Box */}
              <div className="flex justify-center my-2">
                <ZaloQrCode className="w-48 h-48" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Quét mã QR bằng ứng dụng Zalo trên điện thoại hoặc bấm nút bên dưới để trao đổi trực tiếp với Thầy Nguyễn Tuấn Anh (Giám đốc Đào tạo TA Tech Academy).
              </p>

              <button
                onClick={handleZaloChat}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span className="text-white">Mở Chat Zalo Ngay (0901.315.275)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Hoàn Tất & Quay Lại Trang Chủ
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
