import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";

function AdminJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filter, setFilter] = useState("");

  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(filter));
  }, [filter, dispatch]);

  const filteredJobs = allAdminJobs?.filter((job) => {
    const companyName = job.company?.name?.toLowerCase() || "";
    const jobTitle = job.title?.toLowerCase() || "";
    const searchText = searchJobByText.toLowerCase();
    return companyName.includes(searchText) || jobTitle.includes(searchText);
  });

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-64"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Lọc theo tên, vị trí"
          value={filter}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          Tin tuyển dụng mới
        </Button>
      </div>
      <AdminJobsTable jobs={filteredJobs} />
    </div>
  );
}

export default AdminJobs;
