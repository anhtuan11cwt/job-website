import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerCompany = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Vui lòng nhập tên công ty");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message || "Tạo công ty thành công!");
        dispatch(setSingleCompany(response.data.company));
        navigate(`/admin/companies/${response.data.company._id}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi khi tạo công ty";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tên công ty của bạn</h1>
        <p className="text-gray-500">
          Bạn muốn đặt tên công ty là gì? Bạn có thể thay đổi sau.
        </p>
      </div>
      <form onSubmit={registerCompany}>
        <div className="flex flex-col gap-4 mb-6">
          <Label htmlFor="companyName">Tên công ty</Label>
          <Input
            disabled={loading}
            id="companyName"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nhập tên công ty"
            value={companyName}
          />
        </div>
        <div className="flex gap-3">
          <Button
            disabled={loading}
            onClick={() => navigate("/admin/companies")}
            type="button"
            variant="outline"
          >
            Hủy
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? "Đang tạo..." : "Tiếp tục"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyCreate;
