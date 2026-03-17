import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constant";

function CompanySetup() {
  const navigate = useNavigate();
  const params = useParams();
  const _dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    file: null,
    location: "",
    website: "",
  });

  useGetCompanyById();

  useEffect(() => {
    if (singleCompany) {
      setInput({
        companyName: singleCompany.name || "",
        description: singleCompany.description || "",
        file: null,
        location: singleCompany.location || "",
        website: singleCompany.website || "",
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("logo", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success("Cập nhật thông tin công ty thành công!");
        navigate("/admin/companies");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi khi cập nhật công ty";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="mb-8">
        <Button
          className="mb-4"
          onClick={() => navigate("/admin/companies")}
          variant="ghost"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold">Thiết lập công ty</h1>
        <p className="text-gray-500">
          Cập nhật thông tin chi tiết về công ty của bạn
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="companyName">Tên công ty</Label>
            <Input
              id="companyName"
              name="companyName"
              onChange={changeEventHandler}
              placeholder="Nhập tên công ty"
              type="text"
              value={input.companyName}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="description">Mô tả</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              name="description"
              onChange={changeEventHandler}
              placeholder="Mô tả về công ty"
              value={input.description}
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              onChange={changeEventHandler}
              placeholder="https://example.com"
              type="text"
              value={input.website}
            />
          </div>
          <div>
            <Label htmlFor="location">Địa điểm</Label>
            <Input
              id="location"
              name="location"
              onChange={changeEventHandler}
              placeholder="Hà Nội, TP. HCM,..."
              type="text"
              value={input.location}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="logo">Logo công ty</Label>
            <Input
              accept="image/*"
              id="logo"
              onChange={changeFileHandler}
              type="file"
            />
            {singleCompany?.logo && !input.file && (
              <p className="mt-2 text-sm text-gray-500">
                Logo hiện tại:{" "}
                <a
                  className="text-blue-500 underline"
                  href={singleCompany.logo}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Xem logo
                </a>
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button
            disabled={loading}
            onClick={() => navigate("/admin/companies")}
            type="button"
            variant="outline"
          >
            Hủy
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              "Cập nhật"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanySetup;
