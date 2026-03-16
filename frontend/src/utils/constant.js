export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

export const CATEGORIES = [
  { id: "frontend-developer", label: "Nhà phát triển Frontend" },
  { id: "backend-developer", label: "Nhà phát triển Backend" },
  { id: "data-science", label: "Khoa học dữ liệu" },
  { id: "graphic-designer", label: "Thiết kế đồ họa" },
  { id: "fullstack-developer", label: "Nhà phát triển Fullstack" },
  { id: "devops-engineer", label: "Kỹ sư DevOps" },
  { id: "mobile-developer", label: "Nhà phát triển di động" },
  { id: "ai-ml-engineer", label: "Kỹ sư AI/ML" },
];

export const FILTER_DATA = [
  {
    array: ["Hà Nội", "TP. HCM", "Đà Nẵng", "Cần Thơ"],
    filterType: "Địa điểm",
  },
  {
    array: [
      "Phát triển Front-end",
      "Phát triển Back-end",
      "Lập trình viên Fullstack",
    ],
    filterType: "Ngành nghề",
  },
  {
    array: ["0-10 triệu", "10-25 triệu", "25-50 triệu", "Trên 50 triệu"],
    filterType: "Mức lương",
  },
];

export const LATEST_JOBS = [
  {
    company: "FPT Software",
    description:
      "Chúng tôi đang tìm kiếm một Nhà phát triển Frontend lành nghề gia nhập đội ngũ.",
    id: 1,
    jobType: "Bán thời gian",
    location: "Hà Nội",
    positions: 12,
    salary: "15 - 20 Triệu",
    title: "Nhà phát triển Frontend",
  },
  {
    company: "VNG Corporation",
    description:
      "Gia nhập đội ngũ backend của chúng tôi để xây dựng các ứng dụng mở rộng.",
    id: 2,
    jobType: "Toàn thời gian",
    location: "TP. Hồ Chí Minh",
    positions: 5,
    salary: "20 - 35 Triệu",
    title: "Nhà phát triển Backend",
  },
  {
    company: "Viettel Group",
    description: "Làm việc trên các dự án AI và ML tiên tiến.",
    id: 3,
    jobType: "Toàn thời gian",
    location: "Hà Nội",
    positions: 8,
    salary: "30 - 50 Triệu",
    title: "Khoa học dữ liệu",
  },
  {
    company: "Shopee Vietnam",
    description:
      "Sáng tạo những thiết kế hình ảnh ấn tượng cho khách hàng của chúng tôi.",
    id: 4,
    jobType: "Bán thời gian",
    location: "Đà Nẵng",
    positions: 3,
    salary: "10 - 15 Triệu",
    title: "Thiết kế đồ họa",
  },
  {
    company: "Momo (M-Service)",
    description: "Xây dựng các ứng dụng web toàn diện.",
    id: 5,
    jobType: "Toàn thời gian",
    location: "TP. Hồ Chí Minh",
    positions: 10,
    salary: "25 - 40 Triệu",
    title: "Nhà phát triển Fullstack",
  },
  {
    company: "Tiki.vn",
    description: "Quản lý cơ sở hạ tầng đám mây và quy trình CI/CD.",
    id: 6,
    jobType: "Toàn thời gian",
    location: "Hà Nội",
    positions: 6,
    salary: "20 - 30 Triệu",
    title: "Kỹ sư DevOps",
  },
];

export const ALL_JOBS = [
  {
    company: "Tech Innovators",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TI",
    description:
      "Chúng tôi đang tìm kiếm một Lập trình viên Front-end có kinh nghiệm để gia nhập đội ngũ năng động. Bạn sẽ chịu trách nhiệm xây dựng các ứng dụng web chất lượng cao.",
    jobType: "Toàn thời gian",
    location: "Hà Nội",
    positions: 3,
    postedDate: "2 ngày trước",
    salary: "25-50 triệu",
    title: "Lập trình viên Front-end (Senior)",
  },
  {
    company: "DataTech Solutions",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=DT",
    description:
      "Gia nhập đội ngũ của chúng tôi để xây dựng hệ thống backend và API có khả năng mở rộng cho các khách hàng doanh nghiệp.",
    jobType: "Toàn thời gian",
    location: "Đà Nẵng",
    positions: 2,
    postedDate: "3 ngày trước",
    salary: "10-25 triệu",
    title: "Lập trình viên Backend",
  },
  {
    company: "WebCraft Studio",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=WC",
    description:
      "Tìm kiếm một Lập trình viên Fullstack tài năng để làm việc trong các dự án thú vị cho các khách hàng toàn cầu của chúng tôi.",
    jobType: "Toàn thời gian",
    location: "TP. HCM",
    positions: 5,
    postedDate: "5 ngày trước",
    salary: "25-50 triệu",
    title: "Lập trình viên Fullstack",
  },
  {
    company: "Cloud Nine Apps",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=C9",
    description:
      "Xây dựng các ứng dụng di động đa nền tảng và làm việc với các công nghệ tiên tiến nhất.",
    jobType: "Toàn thời gian",
    location: "TP. HCM",
    positions: 4,
    postedDate: "1 tuần trước",
    salary: "10-25 triệu",
    title: "Lập trình viên React Native",
  },
  {
    company: "Digital Dreams",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=DD",
    description:
      "Tạo ra các giao diện người dùng đẹp và phản hồi nhanh cho các ứng dụng web của chúng tôi.",
    jobType: "Bán thời gian",
    location: "Hải Phòng",
    positions: 2,
    postedDate: "3 ngày trước",
    salary: "0-10 triệu",
    title: "Lập trình viên Front-end",
  },
  {
    company: "Code Masters",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=CM",
    description:
      "Thiết kế và triển khai các giải pháp backend hiệu quả bằng Node.js và các framework hiện đại.",
    jobType: "Toàn thời gian",
    location: "Hà Nội",
    positions: 3,
    postedDate: "4 ngày trước",
    salary: "25-50 triệu",
    title: "Lập trình viên Node.js",
  },
  {
    company: "Startup Hub",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=SH",
    description:
      "Cơ hội tuyệt vời cho các bạn mới ra trường để học hỏi và phát triển trong môi trường startup năng động.",
    jobType: "Toàn thời gian",
    location: "Cần Thơ",
    positions: 10,
    postedDate: "1 ngày trước",
    salary: "0-10 triệu",
    title: "Lập trình viên Fullstack (Junior)",
  },
  {
    company: "Tech Giants",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TG",
    description:
      "Dẫn dắt kiến trúc backend và cố vấn cho các lập trình viên trẻ trong đội ngũ kỹ thuật của chúng tôi.",
    jobType: "Toàn thời gian",
    location: "Đà Nẵng",
    positions: 1,
    postedDate: "6 ngày trước",
    salary: "Trên 50 triệu",
    title: "Kỹ sư Backend (Senior)",
  },
];

export const APPLIED_JOBS = [
  {
    company: "Microsoft",
    date: "27-12-2024",
    id: 1,
    jobRole: "Lập trình viên Front-end",
    status: "Selected",
  },
  {
    company: "Google",
    date: "26-12-2024",
    id: 2,
    jobRole: "Lập trình viên Fullstack",
    status: "Pending",
  },
  {
    company: "Facebook",
    date: "25-12-2024",
    id: 3,
    jobRole: "Lập trình viên React Native",
    status: "Rejected",
  },
];
