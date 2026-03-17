import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

function AdminJobsTable({ jobs }) {
  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên công ty</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.length > 0 ? (
            jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">
                  {job.company?.name || "-"}
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
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
                          <title>Thêm thao tác</title>
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-40">
                      <Button
                        className="w-full justify-start"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        variant="ghost"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ứng viên
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={4}>
                Không tìm thấy công việc nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
