import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: "course-ic3-spark",
    title: "Chứng chỉ Quốc tế IC3 Spark & Năng lực Số",
    slug: "ic3-spark-digital-literacy",
    description: "Luyện thi cấp tốc 10 buổi giúp học sinh Tiểu học & THCS làm chủ máy tính, an toàn Internet và đạt chứng chỉ quốc tế Certiport IC3 Spark.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    targetAge: "Học sinh Tiểu học & THCS",
    price: 1200000,
    originalPrice: 1500000,
    category: "Office Skills",
    duration: "10 Buổi (90 phút/buổi)",
    isPublished: true,
    highlights: [
      "Luyện thi chứng chỉ quốc tế Certiport IC3 Spark",
      "Quy tắc Công dân số & An toàn bảo mật trên Internet",
      "Thực hành 100% trên phần mềm giả lập thi thật GMetrix",
      "Học phí ưu đãi cấp tốc chỉ 1.200.000đ/bé"
    ],
    modules: [
      {
        id: "m-ic3-1",
        title: "Mô-đun 1: Máy tính Căn bản & Phần cứng",
        order: 1,
        lessons: [
          { id: "l-ic3-1", title: "Bài 1: Giới thiệu Phần cứng Máy tính & Hệ điều hành", duration: "45 phút", content: "Tìm hiểu CPU, RAM, thiết bị lưu trữ và nguyên lý hoạt động của Windows/macOS.", order: 1 },
          { id: "l-ic3-2", title: "Bài 2: Quản lý Tệp tin & Lưu trữ Đám mây", duration: "45 phút", content: "Tạo thư mục, sắp xếp dữ liệu và sao lưu an toàn trên Google Drive / OneDrive.", order: 2 }
        ]
      },
      {
        id: "m-ic3-2",
        title: "Mô-đun 2: Ứng dụng Văn phòng (Word & PowerPoint)",
        order: 2,
        lessons: [
          { id: "l-ic3-3", title: "Bài 3: Soạn thảo & Định dạng Văn bản chuẩn trong Word", duration: "45 phút", content: "Căn chỉnh lề, chèn hình ảnh, bảng biểu và định dạng văn bản chuyên nghiệp.", order: 1 },
          { id: "l-ic3-4", title: "Bài 4: Thiết kế Slide Trình chiếu Ấn tượng với PowerPoint", duration: "45 phút", content: "Tạo slide, hiệu ứng chuyển động, chèn âm thanh và video sinh động.", order: 2 }
        ]
      },
      {
        id: "m-ic3-3",
        title: "Mô-đun 3: Cuộc sống Trực tuyến & An toàn Mạng",
        order: 3,
        lessons: [
          { id: "l-ic3-5", title: "Bài 5: Bảo vệ Thông tin Cá nhân & Đạo đức Trực tuyến", duration: "45 phút", content: "Nhận biết lừa đảo mạng, bảo vệ mật khẩu và văn hóa ứng xử trên Internet.", order: 1 }
        ]
      }
    ]
  },
  {
    id: "course-middle-school-roadmap",
    title: "Lộ trình Lập trình THCS 72 Buổi (90 Phút/Buổi)",
    slug: "middle-school-programming-ai",
    description: "Chương trình Khoa học Máy tính toàn diện 72 buổi với 7 học phần từ Tư duy lập trình, Scratch, Python, Cấu trúc dữ liệu, Thuật toán đến tích hợp AI Agent.",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    targetAge: "Học sinh THCS (Lớp 6 - Lớp 9)",
    price: 1850000,
    originalPrice: 2200000,
    category: "Programming",
    duration: "72 Buổi (90 phút/buổi)",
    isPublished: true,
    highlights: [
      "7 Học phần chuyên sâu đi từ cơ bản đến nâng cao",
      "Hệ thống Gamified Coding Academy: Nhận EXP & thăng cấp",
      "Tự tay làm Game 2D Scratch và 5+ Ứng dụng Python thực tế",
      "Tích hợp mô hình AI Gemini/OpenAI cho sản phẩm cá nhân"
    ],
    modules: [
      {
        id: "hp1",
        title: "HP1: Tư duy Lập trình & Logic Thuật toán (8 Buổi)",
        order: 1,
        lessons: [
          { id: "l-hp1-1", title: "HP1.1: Phân tích Bài toán", duration: "90 phút", content: "Rèn luyện tư duy lập trình tuần tự", order: 1 },
          { id: "l-hp1-2", title: "HP1.2: Tuần tự, Biến số & Kiểu Dữ liệu", duration: "90 phút", content: "Tìm hiểu lưu trữ biến trong bộ nhớ, nhập xuất và xử lý dữ liệu.", order: 2 }
        ]
      },
      {
        id: "hp2",
        title: "HP2: Lập trình Scratch Căn bản & Hoạt họa (12 Buổi)",
        order: 2,
        lessons: [
          { id: "l-hp2-1", title: "HP2.1: Nhân vật, Tọa độ & Khối lệnh Di chuyển", duration: "90 phút", content: "Tạo chuyển động cho nhân vật trên tọa độ 2D Đề-các.", order: 1 },
          { id: "l-hp2-2", title: "HP2.2: Vòng lặp, Sự kiện & Điều khiển Tương tác", duration: "90 phút", content: "Xử lý sự kiện bàn phím, chuột và va chạm nhân vật.", order: 2 }
        ]
      },
      {
        id: "hp3",
        title: "HP3: Lập trình Game Scratch Nâng cao (10 Buổi)",
        order: 3,
        lessons: [
          { id: "l-hp3-1", title: "HP3.1: Nhân bản (Cloning), Danh sách & Bảng điểm", duration: "90 phút", content: "Xây dựng game bắn máy bay, arcade game với đạn bay và lưu kỷ lục.", order: 1 }
        ]
      },
      {
        id: "hp4",
        title: "HP4: Ngôn ngữ Lập trình Python Căn bản (16 Buổi)",
        order: 4,
        lessons: [
          { id: "l-hp4-1", title: "HP4.1: Chuyển đổi từ Khối lệnh sang Cú pháp Python", duration: "90 phút", content: "Làm quen biến, hàm, câu lệnh nhập xuất văn bản trong Python 3.", order: 1 },
          { id: "l-hp4-2", title: "HP4.2: Cấu trúc Rẽ nhánh & Vòng lặp Python", duration: "90 phút", content: "Vòng lặp For/While, câu lệnh điều kiện lồng nhau và bắt lỗi Try-Except.", order: 2 }
        ]
      },
      {
        id: "hp5",
        title: "HP5: Thuật toán & Cấu trúc Dữ liệu (12 Buổi)",
        order: 5,
        lessons: [
          { id: "l-hp5-1", title: "HP5.1: Thuật toán Sắp xếp, Tìm kiếm & Độ phức tạp Big-O", duration: "90 phút", content: "Sắp xếp nổi bọt, tìm kiếm nhị phân và tối ưu thời gian chạy chương trình.", order: 1 }
        ]
      },
      {
        id: "hp6",
        title: "HP6: Dự án cuối khóa (8 Buổi)",
        order: 6,
        lessons: [
          { id: "l-hp6-1", title: "HP6.1: Thiết kế Kiến trúc & Giao diện GUI", duration: "90 phút", content: "Tạo giao diện ứng dụng với Tkinter/Pygame và quản lý mã nguồn Git.", order: 1 }
        ]
      },
      {
        id: "hp7",
        title: "HP7: AI cho Lập trình & Nhận diện Học máy (6 Buổi)",
        order: 7,
        lessons: [
          { id: "l-hp7-1", title: "HP7.1: Kết nối API Generative AI vào Python", duration: "90 phút", content: "Tích hợp Gemini API xây dựng Chatbot thông minh và nhận diện hình ảnh.", order: 1 }
        ]
      }
    ]
  },
  {
    id: "course-mos-mastery",
    title: "Luyện thi Chứng chỉ MOS Quốc tế (Word / Excel / PowerPoint)",
    slug: "mos-certification-mastery",
    description: "Khóa luyện thi cấp tốc 10 buổi chuẩn Microsoft Office Specialist (MOS). Học phí 1.200.000đ/học viên, cam kết hỗ trợ làm chủ công cụ văn phòng.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    targetAge: "Sinh viên Đại học & Người đi làm",
    price: 1200000,
    originalPrice: 1800000,
    category: "Office Skills",
    duration: "10 Buổi (90 phút/buổi)",
    isPublished: true,
    highlights: [
      "Bao phủ 100% mục tiêu thi MOS Word, Excel và PowerPoint",
      "Thành thạo Excel nâng cao: VLOOKUP, XLOOKUP, PivotTable, Dashboard",
      "Luyện tập sát đề thi thật trên hệ thống máy tính chuẩn",
      "Học phí cực kỳ ưu đãi chỉ 1.200.000đ/học viên"
    ],
    modules: [
      {
        id: "m-mos-1",
        title: "Mô-đun 1: MOS Word Associate / Expert",
        order: 1,
        lessons: [
          { id: "l-mos-1", title: "Bài 1: Định dạng Văn bản Chuyên nghiệp & Định dạng Styles", duration: "90 phút", content: "Tạo mục lục tự động, chú thích, trích dẫn và tài liệu chuẩn quốc tế.", order: 1 }
        ]
      },
      {
        id: "m-mos-2",
        title: "Mô-đun 2: MOS Excel Mastery & Phân tích Dữ liệu",
        order: 2,
        lessons: [
          { id: "l-mos-2", title: "Bài 2: Hàm Nâng cao XLOOKUP & Conditional Formatting", duration: "90 phút", content: "Làm sạch dữ liệu, hàm điều kiện lồng nhau và mảng động.", order: 1 },
          { id: "l-mos-3", title: "Bài 3: PivotTable, Báo cáo Động & Dashboard Điều hành", duration: "90 phút", content: "Xây dựng bảng điều khiển quản trị trực quan tự động cập nhật.", order: 2 }
        ]
      },
      {
        id: "m-mos-3",
        title: "Mô-đun 3: MOS PowerPoint Thuyết trình Đẳng cấp",
        order: 3,
        lessons: [
          { id: "l-mos-4", title: "Bài 4: Slide Master, Template Thương hiệu & Đồ họa Dữ liệu", duration: "90 phút", content: "Thiết kế bộ Slide gọi vốn / báo cáo với hiệu ứng mượt mà.", order: 1 }
        ]
      }
    ]
  },
  {
    id: "course-applied-ai-pro",
    title: "Chương trình Ứng dụng AI Thực chiến (Applied AI)",
    slug: "applied-ai-prompt-engineering",
    description: "Làm chủ các công cụ Generative AI hàng đầu (ChatGPT, Gemini, Claude, Prompt Engineering & Tự động hóa) giúp x10 hiệu suất công việc cá nhân.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    targetAge: "Người đi làm",
    price: 4500000,
    originalPrice: 6000000,
    category: "Applied AI",
    duration: "12 Buổi (90 phút/buổi)",
    isPublished: true,
    highlights: [
      "Khung kỹ thuật Prompt Engineering nâng cao (ChatGPT, Gemini, Claude)",
      "Xây dựng Trợ lý AI Agent & Custom Bot tự động hóa quy trình",
      "Tự động hóa công việc Marketing, Email, Báo cáo & Nghiên cứu",
      "Tạo hình ảnh & Slide tự động với AI thế hệ mới"
    ],
    modules: [
      {
        id: "m-ai-1",
        title: "Mô-đun 1: Nền tảng Generative AI & Prompt Engineering",
        order: 1,
        lessons: [
          { id: "l-ai-1", title: "Bài 1: Kiến trúc LLM & Kỹ thuật Viết Prompt Chuẩn", duration: "90 phút", content: "Tạo cấu trúc prompt mẫu cho kết quả tối ưu ngay lần đầu tiên.", order: 1 },
          { id: "l-ai-2", title: "Bài 2: Phân tích Tài liệu & Báo cáo bằng Gemini, Claude & ChatGPT", duration: "90 phút", content: "Tóm tắt file PDF hàng trăm trang và trích xuất dữ liệu tự động.", order: 2 }
        ]
      },
      {
        id: "m-ai-2",
        title: "Mô-đun 2: Trợ lý AI Agent & Tự động hóa No-Code",
        order: 2,
        lessons: [
          { id: "l-ai-3", title: "Bài 3: Xây dựng Trợ lý AI Chuyên biệt cho Doanh nghiệp", duration: "90 phút", content: "Tạo bot chăm sóc khách hàng, tư vấn bán hàng và kiểm tra dữ liệu.", order: 1 },
          { id: "l-ai-4", title: "Bài 4: Tự động hóa Luồng công việc với AI + Zapier/Make", duration: "90 phút", content: "Tự động gửi email, lưu trữ CRM và thông báo Zalo khi có lead mới.", order: 2 }
        ]
      }
    ]
  }
];
