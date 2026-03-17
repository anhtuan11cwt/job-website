import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ApplicantsTable from "@/components/admin/ApplicantsTable";
import Navbar from "@/components/shared/Navbar";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";

function Applicants() {
  const params = useParams();
  const jobId = params.id;

  useGetAllApplicants(jobId);

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-6">
        <h1 className="font-bold text-xl my-5">
          Danh sách ứng viên ({applicants?.length || 0})
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
}

export default Applicants;
