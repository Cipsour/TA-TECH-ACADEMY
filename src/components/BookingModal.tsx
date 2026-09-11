import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  X, 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCourse
}) => {
  // Generate next 7 days for booking
  const getNext7Days = () => {
    const days = [];
    const weekdays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const label = `${weekdays[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`;
      days.push({ dateStr, label, isToday: i === 0 });
    }
    return days;
  };

  const availableDays = getNext7Days();
  const timeSlots = [
    { id: 'slot-morning', label: '09:00 - 10:30', period: 'Sáng' },
    { id: 'slot-afternoon', label: '14:30 - 16:00', period: 'Chiều' },
    { id: 'slot-evening', label: '19:30 - 21:00', period: 'Tối' }
  ];

  const courses = [
    "Chứng chỉ Quốc tế IC3 Spark & Năng lực Số",
    "Lộ trình Lập trình THCS 72 Buổi (Python & AI)",
    "Luyện thi Chứng chỉ MOS Quốc tế (Word/Excel/PowerPoint)",
    "Chương trình Ứng dụng AI Thực chiến (Applied AI)",
    "Chuyên Toán - Lý - Tin Học Thầy Tuấn Anh"
  ];

  const grades = [
    "Cấp 1 (Tiểu học: Lớp 1 - 5)",
    "Cấp 2 (THCS: Lớp 6 - 9)",
    "Cấp 3 (THPT: Lớp 10 - 12)",
    "Sinh viên / Người đi làm"
  ];

  const [selectedDate, setSelectedDate] = useState<string>(availableDays[0].dateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[0].label);
  const [format, setFormat] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [desiredCourse, setDesiredCourse] = useState<string>(initialCourse || courses[0]);
  const [grade, setGrade] = useState<string>(grades[1]);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Vui lòng nhập Họ tên và Số điện thoại liên hệ!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          grade,
          desiredCourse,
          bookingDate: selectedDate,
          timeSlot: selectedSlot,
          format,
          notes: notes.trim()
        })
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setBookingSuccess(data.booking);
      } else {
        setError(data.error || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err: any) {
      setError('Không thể kết nối máy chủ, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingSuccess ? (
          /* SUCCESS CONFIRMATION SCREEN */
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-bold uppercase mb-2">
                Đặt Lịch Hẹn Thành Công!
              </div>
              <h3 className="text-2xl font-bold text-white">Xác Nhận Đặt Lịch Đánh Giá 1-1</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                Hệ thống đã tự động gửi lịch hẹn tới **Thầy Tuấn Anh** qua Telegram & Email. Thầy sẽ xác nhận lịch qua Zalo trong ít phút!
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Họ tên:</span>
                <span className="font-bold text-white">{bookingSuccess.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Số điện thoại:</span>
                <span className="font-mono text-cyan-400 font-bold">{bookingSuccess.phone}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Khóa học quan tâm:</span>
                <span className="font-semibold text-slate-200">{bookingSuccess.desiredCourse}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Ngày hẹn:</span>
                <span className="font-bold text-amber-400">{bookingSuccess.bookingDate}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Khung giờ:</span>
                <span className="font-bold text-amber-400">{bookingSuccess.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Hình thức:</span>
                <span className="font-semibold text-cyan-400">
                  {bookingSuccess.format === 'ONLINE' ? '💻 Online qua Zoom' : '🏫 Trực tiếp tại Trung tâm'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={`https://zalo.me/0901315275?text=${encodeURIComponent(`Xin chào Thầy Tuấn Anh, tôi vừa đặt lịch đánh giá năng lực 1-1 cho học viên ${bookingSuccess.name} vào ngày ${bookingSuccess.bookingDate} (${bookingSuccess.timeSlot}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo Xác Nhận Lịch Ngay</span>
              </a>

              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        ) : (
          /* FORM BOOKING SCREEN */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ĐÁNH GIÁ NĂNG LỰC & HỌC THỬ 1-1</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Đặt Lịch Đánh Giá Trực Tiếp
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Chọn ngày giờ rảnh của bạn để xếp lịch trao đổi 1-1 trực tiếp cùng Thầy Tuấn Anh.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-medium">
                {error}
              </div>
            )}

            {/* 1. Select Format (Online vs Offline) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>1. Hình Thức Học Thử & Test Năng Lực</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('ONLINE')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    format === 'ONLINE'
                      ? 'bg-blue-950/80 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${format === 'ONLINE' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Online qua Zoom</div>
                    <div className="text-[10px] opacity-75">Tiện lợi, linh hoạt từ xa</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('OFFLINE')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    format === 'OFFLINE'
                      ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${format === 'OFFLINE' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Tại Trung Tâm</div>
                    <div className="text-[10px] opacity-75">Trực tiếp với máy tính chuẩn</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Select Date (Next 7 Days) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>2. Chọn Ngày Hẹn (7 Ngày Tới)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableDays.map((d) => (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      selectedDate === d.dateStr
                        ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>{d.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>3. Chọn Khung Giờ Rảnh</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedSlot === slot.label
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-cyan-400 text-white font-extrabold shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs">{slot.label}</div>
                    <div className="text-[9px] opacity-75 mt-0.5">{slot.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Parent / Student Info Form */}
            <div className="space-y-4 pt-2 border-t border-slate-800/80">
              <label className="text-xs font-bold text-slate-300">
                4. Thông Tin Người Đặt Lịch
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Họ và Tên (*)</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Số Điện Thoại Zalo (*)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0901234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Khối Lớp Học Viên</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white"
                  >
                    {grades.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Khóa Học Quan Tâm</label>
                  <select
                    value={desiredCourse}
                    onChange={(e) => setDesiredCourse(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white"
                  >
                    {courses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-semibold mb-1 block">Ghi Chú Nhu Cầu (Nếu có)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Muốn test năng lực lập trình Python hoặc thi lấy chứng chỉ IC3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>XÁC NHẬN ĐẶT LỊCH HỌC THỬ 1-1</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
