import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_JOBS, LATEST_JOBS } from "@/utils/constant";

function JobDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);

  const allJobs = [...LATEST_JOBS, ...ALL_JOBS];
  const job = allJobs.find((job) => job.id === Number.parseInt(id, 10));

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800">
            Không tìm thấy công việc
          </h2>
          <Button
            className="mt-4 bg-[#7209b7] hover:bg-[#5a06a0]"
            onClick={() => navigate("/jobs")}
          >
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setIsApplied(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-6xl mx-auto my-10 px-4">
        <Button
          className="mb-4 text-gray-600 hover:text-[#7209b7] cursor-pointer"
          onClick={() => navigate("/jobs")}
          variant="ghost"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage alt={job.company} src={job.companyLogo} />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-bold text-xl">
                {job.company?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="font-semibold text-lg">{job.company}</span>
                <span className="mx-2">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  className="text-blue-700 bg-blue-50 hover:bg-blue-100"
                  variant="ghost"
                >
                  <Briefcase className="w-3.5 h-3.5 mr-1" />
                  {job.positions} Vị trí
                </Badge>
                <Badge
                  className="text-red-600 bg-red-50 hover:bg-red-100"
                  variant="ghost"
                >
                  {job.jobType}
                </Badge>
                <Badge
                  className="text-purple-700 bg-purple-50 hover:bg-purple-100"
                  variant="ghost"
                >
                  <Banknote className="w-3.5 h-3.5 mr-0.5" />
                  {job.salary}
                </Badge>
              </div>
            </div>

            <div className="w-full md:w-auto">
              {isApplied ? (
                <Button
                  className="w-full md:w-48 bg-gray-400 cursor-not-allowed"
                  disabled
                >
                  Đã ứng tuyển
                </Button>
              ) : (
                <Button
                  className="w-full md:w-48 bg-[#7209b7] hover:bg-[#5a06a0] cursor-pointer"
                  onClick={handleApply}
                >
                  Ứng tuyển ngay
                </Button>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
              Mô tả công việc
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Vai trò:
                </span>
                <span className="text-gray-800 pl-4">{job.title}</span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Địa điểm:
                </span>
                <span className="text-gray-800 pl-4">{job.location}</span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Loại hình:
                </span>
                <span className="text-gray-800 pl-4">{job.jobType}</span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Mức lương:
                </span>
                <span className="text-gray-800 pl-4">{job.salary}</span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Số lượng:
                </span>
                <span className="text-gray-800 pl-4">
                  {job.positions} vị trí
                </span>
              </div>

              <div className="flex items-start">
                <span className="font-semibold text-gray-700 min-w-[140px]">
                  Ngày đăng:
                </span>
                <span className="text-gray-800 pl-4">
                  {job.postedDate || "Gần đây"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Chi tiết công việc:
              </h3>
              <p className="text-gray-800 leading-relaxed">{job.description}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">24 người đã ứng tuyển</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Đăng ngày hôm nay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
