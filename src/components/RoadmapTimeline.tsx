import React, { useState } from 'react';
import { ROADMAP_DATA } from '../data/roadmapData';
import { 
  Award, 
  ShieldCheck, 
  Globe, 
  Gamepad2, 
  Code2, 
  Cpu, 
  Sparkles, 
  FileSpreadsheet,
  ChevronRight,
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';

interface RoadmapTimelineProps {
  onOpenRegisterModal: (courseName?: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ onOpenRegisterModal }) => {
  const [selectedItem, setSelectedItem] = useState(ROADMAP_DATA[0]);

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Lộ Trình Học Tập Liên Thông
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Lộ Trình Đào Tạo <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Lập Trình & AI 72 Buổi</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Xây dựng nền tảng từ tư duy logic thuật toán, Scratch 2D, đến Python nâng cao và tích hợp Gemini AI Agent. Bấm chọn từng học phần để xem chi tiết.
          </p>
        </div>

        {/* Horizontal Scrollable Timeline Bar */}
        <div className="relative mb-12">
          
          {/* Scrollable Container */}
          <div className="flex items-center gap-4 overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin scrollbar-thumb-slate-700">
            {ROADMAP_DATA.map((item, index) => {
              const isSelected = selectedItem.id === item.id;

              return (
                <div key={item.id} className="flex items-center shrink-0">
                  
                  {/* Step Card */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-300 min-w-[220px] cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/30 shadow-xl shadow-cyan-500/10 scale-105'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Học Phần {item.stageNumber}
                      </span>
                      <div className="p-1.5 rounded-lg bg-blue-600">
                        <Code2 className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="font-bold text-sm text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {item.targetAge}
                    </div>
                  </button>

                  {/* Connecting Arrow */}
                  {index < ROADMAP_DATA.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-600 mx-2 shrink-0" />
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Stage Detail Panel */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Detail Text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-md border border-cyan-800">
                  Học Phần {selectedItem.stageNumber}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  Đối tượng: {selectedItem.targetAge}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Thời lượng: {selectedItem.duration}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {selectedItem.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedItem.description}
              </p>

              {/* Skills Tags */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Kiến Thức & Kỹ Năng Đạt Được
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.skillsLearned.map((skill, i) => (
                    <span 
                      key={i} 
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 rounded-xl bg-slate-950 p-6 border border-slate-800 space-y-4 text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase">
                Đăng Ký Khóa Học
              </div>
              <div className="text-lg font-bold text-white">
                Sẵn sàng cho {selectedItem.title}?
              </div>
              <p className="text-xs text-slate-400">
                Tham gia lớp học sĩ số nhỏ tương tác trực tiếp khai giảng tuần tới.
              </p>
              <button
                onClick={() => onOpenRegisterModal(selectedItem.title)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                Đăng Ký Học Phần {selectedItem.stageNumber}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
