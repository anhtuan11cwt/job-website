import { useSelector } from "react-redux";
import FilterCard from "@/components/shared/FilterCard";
import Job from "@/components/shared/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Jobs() {
  useGetAllJobs();

  const { filterdJobs } = useSelector((store) => store.job);

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
            {filterdJobs.length <= 0 ? (
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
                {filterdJobs.map((job) => (
                  <Job job={job} key={job._id} />
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
