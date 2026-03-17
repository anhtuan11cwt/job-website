import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function useGetAllApplicants(jobId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${jobId}/applicants`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job?.applications ?? []));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ứng viên:", error);
        toast.error("Không thể tải danh sách ứng viên. Vui lòng thử lại.");
      }
    };

    if (jobId) {
      fetchAllApplicants();
    }
  }, [dispatch, jobId]);
}

export default useGetAllApplicants;
