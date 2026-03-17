import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "@/components/shared/FilterCard";
import Job from "@/components/shared/Job";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { filterJobs, setSearchJobByText } from "@/redux/jobSlice";

function Browse() {
  const [localSearch, setLocalSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  useGetAllJobs();

  const { filterdJobs, searchJobByText } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(filterJobs());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchJobByText(localSearch));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchJobByText(localSearch));
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form className="flex-1" onSubmit={handleSearch}>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tìm kiếm công việc..."
                type="text"
                value={localSearch}
              />
            </div>
            <Button className="bg-[#6A38C2] hover:bg-[#5a2fa8]" type="submit">
              Tìm kiếm
            </Button>
          </div>
        </form>

        <Button
          className="md:hidden flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Bộ lọc
        </Button>
      </div>

      <div className="flex gap-6">
        <div
          className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}
        >
          <div className="sticky top-20">
            <FilterCard />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-bold text-xl mb-4">
            Kết quả tìm kiếm ({filterdJobs.length} công việc)
          </h1>
          {searchJobByText && (
            <p className="text-sm text-gray-500 mb-4">
              Tìm kiếm với từ khóa: "{searchJobByText}"
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterdJobs.length <= 0 ? (
              <p className="text-gray-500 text-sm col-span-full">
                Không tìm thấy công việc nào phù hợp với tiêu chí tìm kiếm.
              </p>
            ) : (
              filterdJobs.map((job) => <Job job={job} key={job._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
