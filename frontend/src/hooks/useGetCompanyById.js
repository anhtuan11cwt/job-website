import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

function useGetCompanyById() {
  const params = useParams();
  const dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${params.id}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công ty:", error);
      }
    };

    if (params.id) {
      fetchCompany();
    }
  }, [params.id, dispatch]);

  return singleCompany;
}

export default useGetCompanyById;
