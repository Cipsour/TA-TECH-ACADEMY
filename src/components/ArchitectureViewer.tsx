import React, { useState } from 'react';
import { 
  Database, 
  Code2, 
  Server, 
  CheckCircle2, 
  Copy, 
  Check, 
  FolderTree, 
  Sparkles
} from 'lucide-react';

interface ArchitectureViewerProps {
  onApprovePhase1: () => void;
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ onApprovePhase1 }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'prisma' | 'components' | 'stack'>('info');

  const prismaSchemaCode = `// Prisma Database Schema cho Học viện Vật Lý & CNTT TA TECH
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
}

enum LeadStatus {
  NEW
  CONTACTED
  CONVERTED
}

enum LeadSource {
  FORM
  ZALO
  LANDING
}

model User {
  id            String       @id @default(uuid())
  email         String       @unique
  passwordHash  String
  name          String
  role          Role         @default(STUDENT)
  avatarUrl     String?
  phone         String?
  createdAt     DateTime     @default(now())

  enrollments   Enrollment[]
  progresses    Progress[]
}

model Course {
  id           String       @id @default(uuid())
  title        String
  slug         String       @unique
  description  String
  coverImage   String
  targetAge    String       
  price        Float
  isPublished  Boolean      @default(true)
  duration     String       

  modules      Module[]
  enrollments  Enrollment[]
}

model Module {
  id          String   @id @default(uuid())
  courseId    String
  title       String
  order       Int

  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons     Lesson[]
}

model Lesson {
  id          String     @id @default(uuid())
  moduleId    String
  title       String
  videoUrl    String?
  content     String     @db.Text
  order       Int

  module      Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  progresses  Progress[]
}

model Enrollment {
  id         String   @id @default(uuid())
  userId     String
  courseId   String
  enrolledAt DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
}

model Progress {
  id          String   @id @default(uuid())
  userId      String
  lessonId    String
  isCompleted Boolean  @default(false)

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}

model Lead {
  id            String     @id @default(uuid())
  name          String
  phone         String
  email         String?
  grade         String?    
  desiredCourse String
  notes         String?
  source        LeadSource @default(FORM)
  status        LeadStatus @default(NEW)
  createdAt     DateTime   @default(now())
}`;

  const copySchema = () => {
    navigator.clipboard.writeText(prismaSchemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/80 p-6 sm:p-8 relative shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GIAI ĐOẠN 1: KIẾN TRÚC HỆ THỐNG & ERD</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Kiến Trúc Nền Tảng Giáo Dục TA TECH
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Bản thiết kế tổng thể từ Kiến trúc sư Giải pháp cho Học viện Vật Lý & CNTT TA TECH. Bao gồm Schema cơ sở dữ liệu quan hệ, cấu trúc Component và luồng tích hợp CRM/LMS.
              </p>
            </div>

            <button
              onClick={onApprovePhase1}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Phê Duyệt Kiến Trúc Giai Đoạn 1</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'info' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>1. Kiến Trúc Thư Mục & Thông Tin</span>
          </button>

          <button
            onClick={() => setActiveTab('prisma')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prisma' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>2. ERD Cơ Sở Dữ Liệu (Prisma)</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'components' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>3. Thư Viện Component Cốt Lõi</span>
          </button>

          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'stack' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>4. Công Nghệ & Triển Khai</span>
          </button>
        </div>

        {/* Tab Content 1: Information Architecture & Folder Structure */}
        {activeTab === 'info' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-cyan-400" />
              <span>Cấu Trúc Thư Mục & Kiến Trúc Thông Tin</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-cyan-400 font-bold mb-2">/ (Cấu Trúc Dự Án Gốc)</div>
                <div>├── prisma/</div>
                <div>│   └── schema.prisma         # Schema ORM cơ sở dữ liệu quan hệ</div>
                <div>├── server.ts                 # Express API + Proxy Gemini + Lưu trữ Lead</div>
                <div>├── src/</div>
                <div>│   ├── components/           # Thư viện UI tái sử dụng</div>
                <div>│   │   ├── Header.tsx        # Điều hướng & Chuyển đổi vai trò</div>
                <div>│   │   ├── Hero.tsx          # Banner chính chuyển đổi cao</div>
                <div>│   │   ├── WhyChooseUs.tsx   # 4 trụ cột đào tạo cốt lõi</div>
                <div>│   │   ├── RoadmapTimeline.tsx # Lộ trình ngang 8 giai đoạn</div>
                <div>│   │   ├── CourseCatalog.tsx # Danh mục khóa học & Modal giáo trình</div>
                <div>│   │   ├── RegistrationModal.tsx # Đăng ký & Tạo mã QR Zalo</div>
                <div>│   │   ├── StudentProjects.tsx # Lưới trưng bày sản phẩm học viên</div>
                <div>│   │   ├── AiAssistant.tsx   # Trợ lý AI tư vấn Gemini API</div>
                <div>│   │   ├── LmsPortal.tsx     # Bảng điều khiển học viên & Xem video</div>
                <div>│   │   ├── AdminCrm.tsx      # Hệ thống CRM quản lý Lead tuyển sinh</div>
                <div>│   │   └── ArchitectureViewer.tsx # Xem bản thiết kế kiến trúc Giai đoạn 1</div>
                <div>│   ├── data/                 # Bộ dữ liệu (Khóa học, Lộ trình, Dự án)</div>
                <div>│   └── types.ts              # Khai báo TypeScript Interfaces</div>
                <div>└── package.json</div>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">Các Phân Hệ Kiến Trúc Chính:</div>
                  <ul className="space-y-2 list-disc pl-4 text-slate-300">
                    <li><strong>Trang Marketing & Giới Thiệu Public</strong>: Trang giới thiệu khóa học IC3, MOS, Scratch, Python & AI dành cho học sinh và người đi làm.</li>
                    <li><strong>Thu Nhận Lead & CRM Tuyển Sinh</strong>: Form đăng ký đa bước lưu trữ vào CRM và tự động tạo mã QR Zalo kết nối trực tiếp.</li>
                    <li><strong>Cổng Học Viên LMS</strong>: Đăng nhập học viên, xem bài giảng video, theo dõi tiến độ và cấp chứng chỉ.</li>
                    <li><strong>Trợ Lý AI Tư Vấn Học Tập</strong>: Tích hợp Gemini 2.5 Flash tư vấn lộ trình học tự động theo yêu cầu cá nhân.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab Content 2: Prisma ERD Code */}
        {activeTab === 'prisma' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Prisma Schema (Mã Cấu Trúc ERD PostgreSQL)</span>
              </h3>
              <button
                onClick={copySchema}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Đã sao chép!" : "Sao Chép Schema"}</span>
              </button>
            </div>

            <pre className="rounded-2xl bg-slate-950 p-5 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[500px]">
              {prismaSchemaCode}
            </pre>
          </div>
        )}

        {/* Tab Content 3: Core Component Library */}
        {activeTab === 'components' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Tổng Quan Thư Viện Component Cốt Lõi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">CourseCard Component</div>
                <div className="text-slate-400">Hiển thị thông tin khóa học, độ tuổi phù hợp, học phí, điểm nổi bật và modal giáo trình.</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">RegistrationModal Component</div>
                <div className="text-slate-400">Form đăng ký đa bước, lưu trữ thông tin lead và hiển thị mã QR Zalo.</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">RoadmapTimeline Component</div>
                <div className="text-slate-400">Lộ trình học 8 giai đoạn cuộn ngang với phân tích năng lực chi tiết.</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">LmsPortal Component</div>
                <div className="text-slate-400">Giao diện học viên với thanh tiến độ, video bài giảng và đánh dấu bài học.</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">AdminCrm Component</div>
                <div className="text-slate-400">Bảng quản trị CRM cho phép chuyển đổi trạng thái lead (MỚI, ĐÃ LIÊN HỆ, ĐÃ NHẬP HỌC).</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">AiAssistant Component</div>
                <div className="text-slate-400">Trợ lý AI tích hợp Gemini hỗ trợ tư vấn khóa học và thiết kế lộ trình cá nhân.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Tech Stack */}
        {activeTab === 'stack' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>Công Nghệ & Hạ Tầng Triển Khai</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">Phân Hệ Frontend</div>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>React 19 & TypeScript</li>
                  <li>Tailwind CSS v4 (Glassmorphism & Tech Blue)</li>
                  <li>Motion (Framer Motion v12)</li>
                  <li>Biểu tượng Lucide Icons</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-white text-sm">Phân Hệ Backend & Dữ Liệu</div>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Express v4 Node.js Server</li>
                  <li>Google GenAI SDK (@google/genai) cho Gemini 2.5</li>
                  <li>Prisma ORM & PostgreSQL Database Schema</li>
                  <li>RESTful JSON APIs cho CRM Lead & Tiến Độ LMS</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
