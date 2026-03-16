import { FileText, Mail, Pen, Phone } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "@/components/shared/AppliedJobTable";
import UpdateProfileDialog from "@/components/shared/UpdateProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { APPLIED_JOBS } from "@/utils/constant";

function Profile() {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const skills = user?.profile?.skills || [];
  const resume = user?.profile?.resume;
  const resumeOriginalName = user?.profile?.resumeOriginalName;

  const appliedJobs = APPLIED_JOBS;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                alt={user?.fullname}
                src={user?.profile?.profilePhoto}
              />
              <AvatarFallback className="text-2xl">
                {user?.fullname?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">
                {user?.fullname || "Người dùng"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {user?.profile?.bio || "Chưa cập nhật tiểu sử"}
              </p>
              {user?.role && (
                <p className="text-gray-500 text-xs mt-1">
                  Vai trò:{" "}
                  <span className="font-medium">
                    {user.role === "student"
                      ? "Ứng viên"
                      : user.role === "recruiter"
                        ? "Nhà tuyển dụng"
                        : user.role}
                  </span>
                </p>
              )}
              {user?._id && (
                <p className="text-gray-400 text-[11px] mt-1 select-all">
                  ID: {user._id}
                </p>
              )}
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Pen className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="text-sm">
              {user?.email || "Chưa cập nhật email"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="text-sm">
              {user?.phoneNumber || "Chưa cập nhật số điện thoại"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Kỹ năng</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">
                Chưa cập nhật kỹ năng
              </span>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Sơ yếu lý lịch</h2>
          {resume ? (
            <a
              className="text-blue-600 hover:underline flex items-center gap-2"
              href={resume}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FileText className="h-4 w-4" />
              {resumeOriginalName || "Xem hồ sơ"}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">Chưa tải lên hồ sơ</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="font-bold text-lg mb-4">Công việc đã ứng tuyển</h1>
        <AppliedJobTable jobs={appliedJobs} />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
