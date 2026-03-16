import Job from "@/components/shared/Job";

const allJobs = [
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
];

function Browse() {
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl">Kết quả tìm kiếm ({allJobs.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {allJobs.map((job) => (
          <Job job={job} key={`${job.company}-${job.title}`} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
