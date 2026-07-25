import { RoadmapStage } from '../types';

export const ROADMAP_DATA: RoadmapStage[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    title: "HP1: Tư duy Lập trình & Logic Thuật toán",
    targetAge: "Tiểu học & THCS",
    duration: "8 Buổi (90 phút/buổi)",
    description: "Xây dựng tư duy giải quyết vấn đề bằng cách chia nhỏ bài toán phức tạp, phân tích thuật toán qua sơ đồ khối và giả mã.",
    skillsLearned: ["Sơ đồ khối Flowchart", "Tư duy Logic", "Giải mã Pseudo-code", "Phân tích Bài toán"],
    isCore: true
  },
  {
    id: "stage-2",
    stageNumber: 2,
    title: "HP2: Lập trình Scratch Căn bản & Hoạt họa",
    targetAge: "Tiểu học & THCS",
    duration: "12 Buổi (90 phút/buổi)",
    description: "Khám phá thế giới lập trình qua khối lệnh trực quan. Tạo chuyển động nhân vật, âm thanh và game hoạt hình 2D đầu tay.",
    skillsLearned: ["Khối lệnh Scratch", "Tọa độ 2D", "Vòng lặp & Sự kiện", "Thiết kế Hoạt họa"],
    isCore: true
  },
  {
    id: "stage-3",
    stageNumber: 3,
    title: "HP3: Lập trình Game Scratch Nâng cao",
    targetAge: "THCS (Lớp 6 - Lớp 9)",
    duration: "10 Buổi (90 phút/buổi)",
    description: "Phát triển các dòng game Arcade 2D phức tạp với cơ chế nhân bản (cloning), lưu điểm số, bảng xếp hạng và thuật toán va chạm.",
    skillsLearned: ["Kỹ thuật Nhân bản (Cloning)", "Biến & Mảng Dữ liệu", "Thuật toán Game 2D", "Thiết kế Màn chơi"],
    isCore: true
  },
  {
    id: "stage-4",
    stageNumber: 4,
    title: "HP4: Ngôn ngữ Lập trình Python Căn bản",
    targetAge: "THCS & THPT",
    duration: "16 Buổi (90 phút/buổi)",
    description: "Chuyển giao từ tư duy khối lệnh sang ngôn ngữ lập trình văn bản phổ biến nhất thế giới. Làm chủ cú pháp, biến, chuỗi và hàm trong Python.",
    skillsLearned: ["Cú pháp Python 3", "Cấu trúc Điều kiện", "Cấu trúc Vòng lặp", "Viết Hàm & Module"],
    isCore: true
  },
  {
    id: "stage-5",
    stageNumber: 5,
    title: "HP5: Thuật toán & Cấu trúc Dữ liệu Python",
    targetAge: "THCS & THPT",
    duration: "12 Buổi (90 phút/buổi)",
    description: "Đi sâu vào kiến thức cốt lõi của Khoa học Máy tính: Thuật toán sắp xếp, tìm kiếm, cấu trúc dữ liệu List/Dict và tối ưu độ phức tạp Big-O.",
    skillsLearned: ["Thuật toán Tìm kiếm/Sắp xếp", "Cấu trúc List, Dict, Set", "Đánh giá Độ phức tạp Big-O", "Bắt lỗi & Đệ quy"],
    isCore: true
  },
  {
    id: "stage-6",
    stageNumber: 6,
    title: "HP6: Đồ án Tốt nghiệp Phần mềm",
    targetAge: "THCS & THPT",
    duration: "8 Buổi (90 phút/buổi)",
    description: "Tự tay lên ý tưởng, thiết kế giao diện đồ họa GUI và lập trình hoàn chỉnh một ứng dụng phần mềm hoặc game 2D để bảo vệ trước Hội đồng Học thuật.",
    skillsLearned: ["Giao diện Tkinter / Pygame", "Quản lý Mã nguồn Git", "Lập trình Hướng đối tượng OOP", "Kỹ năng Báo cáo & Bảo vệ Đồ án"],
    isCore: true
  },
  {
    id: "stage-7",
    stageNumber: 7,
    title: "HP7: AI cho Lập trình & Nhận diện Học máy",
    targetAge: "THCS & THPT",
    duration: "6 Buổi (90 phút/buổi)",
    description: "Tiếp cận công nghệ tương lai: Kết nối ứng dụng Python với Gemini AI API, huấn luyện mô hình nhận diện hình ảnh và giọng nói.",
    skillsLearned: ["Tích hợp Gemini API", "Mô hình Nhận diện Hình ảnh", "Xử lý Giọng nói AI", "Kỹ thuật Prompting trong Code"],
    isCore: false
  }
];
