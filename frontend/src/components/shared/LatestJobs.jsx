import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import LatestJobCards from "./LatestJobCards";

function LatestJobs() {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Việc làm <span className="text-[#6A38C2]">Mới nhất & Hàng đầu</span>
      </h1>

      {allJobs.length <= 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">Không có công việc nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards job={job} key={job._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestJobs;
