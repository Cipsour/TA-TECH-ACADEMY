import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { Course } from '../types';
import { 
  Clock, 
  Users, 
  CheckCircle2, 
  BookOpen, 
  X
} from 'lucide-react';

interface CourseCatalogProps {
  onOpenRegisterModal: (courseName?: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onOpenRegisterModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);

  const categories = ['Tất cả', 'Cấp 1 & Cấp 2', 'Office Skills', 'Programming', 'Applied AI'];

  const filteredCourses = activeCategory === 'Tất cả'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === activeCategory || (activeCategory === 'Cấp 1 & Cấp 2' && (c.targetAge.includes('Tiểu học') || c.targetAge.includes('THCS'))));

  return (
    <section id="courses" className="py-20 bg-slate-900 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Chương Trình Đào Tạo Chuẩn
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Danh Mục <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Khóa Học & Chứng Chỉ</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Luyện thi chứng chỉ quốc tế Certiport IC3 Spark, MOS Specialist, Lộ trình Lập trình 72 buổi THCS và AI Ứng dụng Bứt phá cho Người đi làm.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden hover:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Course Image Header */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={course.coverImage} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-400 font-semibold text-xs backdrop-blur-md">
                      {course.category}
                    </span>
                  </div>

                  {/* Pricing Tag */}
                  <div className="absolute bottom-3 right-4 bg-slate-900/95 border border-slate-700 px-3 py-1.5 rounded-xl text-right backdrop-blur-md">
                    <div className="text-sm font-extrabold text-cyan-400">
                      {course.price.toLocaleString('vi-VN')} VNĐ
                    </div>
                    {course.originalPrice && (
                      <div className="text-[10px] text-slate-400 line-through">
                        {course.originalPrice.toLocaleString('vi-VN')} VNĐ
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 space-y-4">
                  
                  {/* Title & Target */}
                  <div>
                    <h3 className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                        {course.targetAge}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Điểm Nổi Bật Khoá Học:</div>
                    {course.highlights.slice(0, 3).map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourseForDetail(course)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold text-xs text-center transition-all cursor-pointer"
                >
                  Xem Khung Chương Trình
                </button>
                <button
                  onClick={() => onOpenRegisterModal(course.title)}
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs text-center shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Đăng Ký Khóa Học
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Syllabus Modal */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 text-white relative shadow-2xl">
            
            <button
              onClick={() => setSelectedCourseForDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-blue-950 text-cyan-400 font-semibold text-xs border border-blue-800">
                Chi Tiết Khung Đào Tạo - {selectedCourseForDetail.category}
              </span>
              <h3 className="text-2xl font-bold">{selectedCourseForDetail.title}</h3>
              <p className="text-xs text-slate-300">{selectedCourseForDetail.description}</p>

              <div className="pt-4 space-y-4">
                <div className="font-bold text-sm text-cyan-400 uppercase tracking-wider">
                  Mô-đun & Bài Học Chi Tiết:
                </div>

                {selectedCourseForDetail.modules.map((m) => (
                  <div key={m.id} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      {m.title}
                    </div>
                    <div className="space-y-1.5 pl-6 border-l-2 border-slate-800">
                      {m.lessons.map((l) => (
                        <div key={l.id} className="text-xs text-slate-300 flex items-center justify-between">
                          <span>• {l.title}</span>
                          <span className="text-[10px] text-slate-400">{l.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCourseForDetail(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const title = selectedCourseForDetail.title;
                    setSelectedCourseForDetail(null);
                    onOpenRegisterModal(title);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg"
                >
                  Đăng Ký Khóa Học Này
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
