import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { JOB_API_END_POINT } from "@/utils/constant";

function PostJob() {
  const navigate = useNavigate();
  const _dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    companyId: "",
    description: "",
    experienceLevel: "",
    jobType: "",
    location: "",
    position: 0,
    requirements: "",
    salary: "",
    title: "",
  });

  useGetAllCompanies();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectChangeHandler = (value, field) => {
    setInput({ ...input, [field]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Vui lòng chọn công ty");
      return;
    }

    if (
      !input.title ||
      !input.description ||
      !input.requirements ||
      !input.salary ||
      !input.location ||
      !input.jobType ||
      !input.experienceLevel ||
      !input.position
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...input,
        position: Number(input.position),
        salary: Number(input.salary),
      };

      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Đăng tin tuyển dụng thành công!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng tin";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = [
    { label: "Toàn thời gian", value: "Full-time" },
    { label: "Bán thời gian", value: "Part-time" },
    { label: "Thực tập", value: "Internship" },
    { label: "Hợp đồng", value: "Contract" },
    { label: "Freelance", value: "Freelance" },
  ];

  const experienceLevels = [
    { label: "Junior (Mới ra trường)", value: "Junior" },
    { label: "Mid-level (1-3 năm)", value: "Mid-level" },
    { label: "Senior (3-5 năm)", value: "Senior" },
    { label: "Lead (5+ năm)", value: "Lead" },
    { label: "Quản lý", value: "Manager" },
  ];

  const locations = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Biên Hòa",
    "Nha Trang",
    "Huế",
    "Quy Nhơn",
    "Vũng Tàu",
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Đăng tin tuyển dụng mới</h1>
        <p className="text-gray-500">
          Điền thông tin chi tiết để đăng tin tuyển dụng
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium mb-4">
            Bạn cần đăng ký công ty trước khi đăng tin tuyển dụng
          </p>
          <Button onClick={() => navigate("/admin/companies/create")}>
            Đăng ký công ty
          </Button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề công việc</Label>
              <Input
                disabled={loading}
                id="title"
                name="title"
                onChange={changeEventHandler}
                placeholder="VD: Lập trình viên Frontend"
                value={input.title}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyId">Công ty</Label>
              <Select
                onValueChange={(value) =>
                  selectChangeHandler(value, "companyId")
                }
                value={input.companyId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn công ty" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Loại công việc</Label>
              <Select
                onValueChange={(value) => selectChangeHandler(value, "jobType")}
                value={input.jobType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại công việc" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Cấp độ kinh nghiệm</Label>
              <Select
                onValueChange={(value) =>
                  selectChangeHandler(value, "experienceLevel")
                }
                value={input.experienceLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cấp độ kinh nghiệm" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Địa điểm</Label>
              <Select
                onValueChange={(value) =>
                  selectChangeHandler(value, "location")
                }
                value={input.location}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Mức lương</Label>
              <Input
                disabled={loading}
                id="salary"
                name="salary"
                onChange={changeEventHandler}
                placeholder="VD: 15000000"
                type="number"
                value={input.salary}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Số lượng cần tuyển</Label>
              <Input
                disabled={loading}
                id="position"
                name="position"
                onChange={changeEventHandler}
                placeholder="VD: 2"
                type="number"
                value={input.position}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả công việc</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              id="description"
              name="description"
              onChange={changeEventHandler}
              placeholder="Mô tả chi tiết về công việc..."
              value={input.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Yêu cầu</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              id="requirements"
              name="requirements"
              onChange={changeEventHandler}
              placeholder="Yêu cầu về kỹ năng, kinh nghiệm..."
              value={input.requirements}
            />
          </div>

          <div className="flex gap-3">
            <Button
              disabled={loading}
              onClick={() => navigate("/admin/jobs")}
              type="button"
              variant="outline"
            >
              Hủy
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Đang đăng tin..." : "Đăng tin tuyển dụng"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostJob;
