import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { 
  PlayCircle, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Code2,
  FileText,
  Download
} from 'lucide-react';

export const LmsPortal: React.FC = () => {
  const currentCourse = COURSES_DATA[1]; // Middle School Roadmap
  
  // Completed lessons state tracking
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "l-hp1-1",
    "l-hp1-2",
    "l-hp2-1"
  ]);

  const [activeLessonId, setActiveLessonId] = useState<string>("l-hp2-2");

  // Calculate overall progress
  const allLessons = currentCourse.modules.flatMap(m => m.lessons);
  const totalLessonsCount = allLessons.length;
  const progressPercent = Math.round((completedLessons.length / totalLessonsCount) * 100);

  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];

  const handleToggleComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* LMS Student Welcome Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            
            {/* Student Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                  alt="Avatar học viên" 
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-[10px]">
                    CỔNG HỌC VIÊN LMS
                  </span>
                  <span className="text-xs text-slate-400">Mã HV: NX-88902</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  Chào mừng trở lại, Nguyễn Minh Triết!
                </h2>
                <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Khóa học đang tham gia: <strong>{currentCourse.title}</strong></span>
                </div>
              </div>
            </div>

            {/* Overall Progress Indicator */}
            <div className="w-full md:w-72 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Tiến Độ Lộ Trình</span>
                <span className="font-bold text-cyan-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Hoàn thành {completedLessons.length} / {totalLessonsCount} Bài học</span>
                {progressPercent >= 100 && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Award className="w-3 h-3" /> Đủ Điều Kiện Nhận Chứng Chỉ
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Main LMS Workspace (Video + Lessons Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Video & Lesson Content Player (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Simulated High-Tech Video Player */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative">
              <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                
                {/* Simulated Video Canvas */}
                <img 
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80" 
                  alt="Xem trước bài giảng"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />

                <div className="relative z-10 space-y-4 max-w-lg">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-transform cursor-pointer">
                    <PlayCircle className="w-10 h-10 fill-slate-950 text-cyan-500" />
                  </div>
                  <div className="font-bold text-lg text-white">
                    {activeLesson.title}
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Thời lượng video: {activeLesson.duration || "90 phút"} • Chất lượng 1080p HD
                  </div>
                </div>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-cyan-400">Video Bài Giảng Thực Hành #04</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleToggleComplete(activeLesson.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        completedLessons.includes(activeLesson.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completedLessons.includes(activeLesson.id) ? "Đã Hoàn Thành Bài Học" : "Đánh Dấu Hoàn Thành"}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Lesson Text Content & Code Notes */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>{activeLesson.title}</span>
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {activeLesson.duration}
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-3">
                <p>{activeLesson.content}</p>
                <p>Trong buổi học này, học sinh áp dụng tư duy logic vào bài tập lập trình thực tế, chạy thử nghiệm code và trực tiếp sửa lỗi dưới sự hướng dẫn của trợ giảng.</p>
              </div>

              {/* Sample Code Exercise snippet */}
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> bai_tap_python_04.py
                  </span>
                  <span className="text-[10px]">Python 3.12</span>
                </div>
                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto p-2 bg-slate-950 rounded">
{`# Bài tập Thực hành - Học viện Nexus
def tinh_diem_trung_binh(danh_sach_diem):
    trung_binh = sum(danh_sach_diem) / len(danh_sach_diem)
    if trung_binh >= 9.0:
        return "Đủ điều kiện nhận Chứng chỉ Xuất sắc"
    return "Đạt"

print(tinh_diem_trung_binh([9.5, 9.8, 9.2]))`}
                </pre>
              </div>

            </div>

          </div>

          {/* Module & Lesson Navigation Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Danh Sách Học Phần</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  7 Học Phần
                </span>
              </div>

              {/* Module List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {currentCourse.modules.map((m) => (
                  <div key={m.id} className="rounded-2xl bg-slate-950 border border-slate-800/90 p-4 space-y-2">
                    <div className="font-semibold text-xs text-cyan-300 flex items-center justify-between">
                      <span className="truncate">{m.title}</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {m.lessons.map((l) => {
                        const isDone = completedLessons.includes(l.id);
                        const isActive = activeLessonId === l.id;

                        return (
                          <button
                            key={l.id}
                            onClick={() => setActiveLessonId(l.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                              isActive
                                ? 'bg-blue-600/30 border border-blue-500 text-white font-bold'
                                : 'hover:bg-slate-900 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{l.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-1">{l.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Certificate Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-950 border border-emerald-800/60 text-center space-y-2">
                <Award className="w-6 h-6 text-amber-400 mx-auto" />
                <div className="font-bold text-xs text-white">Chứng Nhận Tốt Nghiệp Lập Trình Python & AI</div>
                <div className="text-[10px] text-slate-400">Hoàn thành 100% bài học để mở khóa tải chứng nhận chính thức.</div>
                <button
                  disabled={progressPercent < 100}
                  onClick={() => alert("Đang tải file PDF Chứng nhận Học viện Nexus & Certiport...")}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Chứng Nhận PDF</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
