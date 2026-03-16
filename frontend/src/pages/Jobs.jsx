import FilterCard from "@/components/shared/FilterCard";
import Job from "@/components/shared/Job";

const jobs = [
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

function Jobs() {
  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="flex gap-6">
        <div className="w-1/5 hidden md:block">
          <div className="sticky top-20">
            <FilterCard />
          </div>
        </div>

        <div className="w-full md:w-4/5">
          <div className="h-[88vh] overflow-y-auto pr-2 scrollbar-hide">
            {jobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-96">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy công việc nào
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Thử thay đổi bộ lọc để tìm kiếm
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
                {jobs.map((job) => (
                  <Job job={job} key={`${job.company}-${job.title}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
