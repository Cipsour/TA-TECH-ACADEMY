import { StudentProject } from '../types';

export const STUDENT_PROJECTS_DATA: StudentProject[] = [
  {
    id: "proj-1",
    title: "Game 2D Bắn Máy Bay Tránh Thiên Thạch",
    studentName: "Nguyễn Minh Triết",
    studentAge: 12,
    projectType: "SCRATCH 2D GAME",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    description: "Trò chơi không gian với hiệu ứng va chạm nhân bản (cloning), lưu điểm cao kỷ lục và nhạc nền tự tạo.",
    techStack: ["Scratch 3.0", "Cloning", "Variables"],
    likesCount: 142
  },
  {
    id: "proj-2",
    title: "Phần Mềm Nhận Diện Học Sinh Đi Học Bằng Camera AI",
    studentName: "Trần Đức Hoàng",
    studentAge: 15,
    projectType: "PYTHON & AI AGENT",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    description: "Sử dụng OpenCV Python và Gemini AI API để tự động điểm danh khuôn mặt học sinh và gửi tin nhắn báo về Zalo phụ huynh.",
    techStack: ["Python 3.12", "OpenCV", "Gemini API"],
    likesCount: 289
  },
  {
    id: "proj-3",
    title: "Trợ Lý Ảo Ôn Thi Chứng Chỉ IC3 Spark",
    studentName: "Lê Ngọc Bảo An",
    studentAge: 10,
    projectType: "AI CHATBOT APP",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    description: "Ứng dụng trắc nghiệm kiến thức máy tính IC3 Spark tự động chấm điểm và đưa ra giải thích đáp án bằng AI.",
    techStack: ["Python", "Tkinter", "AI Prompting"],
    likesCount: 198
  }
];

export const CUSTOM_FAQS = [
  {
    q: "Khóa học Lập trình THCS 72 buổi có yêu cầu kiến thức đầu vào không?",
    a: "Không, lộ trình 72 buổi hoàn toàn không yêu cầu kiến thức đầu vào. Các em học sinh sẽ được hướng dẫn từ nền tảng tư duy lập trình căn bản (8 buổi đầu) trước khi đi sâu vào thực hành sáng tạo."
  },
  {
    q: "Các chứng chỉ như IC3 hay MOS dành cho độ tuổi nào?",
    a: "Chứng chỉ IC3 Spark dành cho học sinh Tiểu học; IC3 Digital Literacy phù hợp cho cả học sinh Tiểu học và THCS; còn chứng chỉ MOS (Microsoft Office Specialist) dành riêng cho sinh viên và người đi làm."
  },
  {
    q: "Nền tảng học tập của TA Tech Academy có gì đặc biệt?",
    a: "Hệ thống học tập được thiết kế theo mô hình Game hóa (Gamified Coding Academy). Học viên làm nhiệm vụ, nhận điểm kinh nghiệm (EXP), thăng cấp, vinh danh trên Bảng xếp hạng (Hall of Fame) và tương tác với AI Mentor 24/7."
  },
  {
    q: "Làm sao để đăng ký học hoặc nhận tư vấn từ Thầy Nguyễn Tuấn Anh?",
    a: "Học viên hoặc phụ huynh có thể để lại thông tin qua Form đăng ký trên website, hoặc quét mã QR / liên hệ trực tiếp qua số Zalo 0901315275 để gặp trực tiếp Thầy Nguyễn Tuấn Anh."
  }
];
