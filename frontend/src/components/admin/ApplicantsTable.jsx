import axios from "axios";
import { Check, FileText, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateApplicantStatus } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function ApplicantsTable({ applicants }) {
  const dispatch = useDispatch();

  const handleStatusChange = async (applicantId, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicantId}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(updateApplicantStatus({ applicantId, status }));
        toast.success(
          status === "accepted"
            ? "Đã chấp nhận ứng viên"
            : "Đã từ chối ứng viên",
        );
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
            <Check className="h-4 w-4" />
            Đã chấp nhận
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
            <X className="h-4 w-4" />
            Đã từ chối
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-yellow-600 text-sm font-medium">
            Đang chờ
          </span>
        );
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Hồ sơ</TableHead>
            <TableHead>Ngày nộp</TableHead>
            <TableHead className="text-right">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.length > 0 ? (
            applicants.map((applicant) => (
              <TableRow key={applicant._id}>
                <TableCell className="font-medium">
                  {applicant.applicant?.fullname || "-"}
                </TableCell>
                <TableCell>{applicant.applicant?.email || "-"}</TableCell>
                <TableCell>
                  {applicant.applicant?.phoneNumber || "Không có"}
                </TableCell>
                <TableCell>
                  {applicant.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                      href={applicant.applicant.profile.resume}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FileText className="h-4 w-4" />
                      Xem CV
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Không có</span>
                  )}
                </TableCell>
                <TableCell>
                  {applicant.createdAt
                    ? new Date(applicant.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {getStatusBadge(applicant.status)}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="h-8 w-8" size="icon" variant="ghost">
                          <svg
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <title>Thao tác thêm</title>
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-40">
                        <div className="flex flex-col gap-1">
                          <Button
                            className="w-full justify-start gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() =>
                              handleStatusChange(applicant._id, "accepted")
                            }
                            variant="ghost"
                          >
                            <Check className="h-4 w-4" />
                            Chấp nhận
                          </Button>
                          <Button
                            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() =>
                              handleStatusChange(applicant._id, "rejected")
                            }
                            variant="ghost"
                          >
                            <X className="h-4 w-4" />
                            Từ chối
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={6}>
                Chưa có ứng viên nào ứng tuyển.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
