import { useSelector } from "react-redux";
import Job from "@/components/shared/Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Browse() {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl">Kết quả tìm kiếm ({allJobs.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {allJobs.length <= 0 ? (
          <p className="text-gray-500 text-sm col-span-full">
            Không tìm thấy công việc nào
          </p>
        ) : (
          allJobs.map((job) => <Job job={job} key={job._id} />)
        )}
      </div>
    </div>
  );
}

export default Browse;
