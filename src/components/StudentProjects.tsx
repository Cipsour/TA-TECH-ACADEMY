import React, { useState } from 'react';
import { STUDENT_PROJECTS_DATA } from '../data/projectsData';
import { Heart, Play, User } from 'lucide-react';

export const StudentProjects: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    STUDENT_PROJECTS_DATA.forEach(p => map[p.id] = p.likesCount);
    return map;
  });

  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Sản Phẩm Học Viên
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Dự Án Do <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Học Viên Tự Lập Trình</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Từ game Scratch 2D sáng tạo đến phần mềm nhận diện AI Python và công cụ hỗ trợ ôn thi do các bạn học sinh từ 8 đến 18 tuổi xây dựng.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STUDENT_PROJECTS_DATA.map((project) => (
            <div 
              key={project.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-800 text-cyan-400 text-[10px] font-mono font-bold">
                    {project.projectType}
                  </span>

                  <button
                    onClick={() => handleLike(project.id)}
                    className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-rose-400 text-xs font-bold hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{likes[project.id]}</span>
                  </button>
                </div>

                {/* Project Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-medium text-slate-300">{project.studentName}</span>
                    <span>•</span>
                    <span className="text-[11px] text-slate-400">{project.studentAge} tuổi</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Demo Action */}
              <div className="p-5 pt-0">
                <button 
                  onClick={() => alert(`Khởi chạy trải nghiệm trực tiếp dự án "${project.title}" của học viên ${project.studentName}...`)}
                  className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                  <span>Trải Nghiệm Demo Trực Tiếp</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
