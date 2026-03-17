import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function useGetAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc đã ứng tuyển:", error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
}

export default useGetAppliedJobs;
