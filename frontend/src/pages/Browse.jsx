import Job from "@/components/shared/Job";
import { ALL_JOBS } from "@/utils/constant";

function Browse() {
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl">
        Kết quả tìm kiếm ({ALL_JOBS.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {ALL_JOBS.map((job) => (
          <Job job={job} key={`${job.company}-${job.title}`} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
