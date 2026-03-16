import LatestJobCards from "./LatestJobCards";

const jobs = [
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

function LatestJobs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Việc làm <span className="text-[#6A38C2]">Mới nhất & Hàng đầu</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.slice(0, 6).map((job) => (
          <LatestJobCards job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
