import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

function CompaniesTable({ companies }) {
  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Tên công ty</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length > 0 ? (
            companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell className="font-medium">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt={company.name} src={company.logo} />
                    <AvatarFallback>
                      {company.name?.slice(0, 2).toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString("vi-VN")
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
                    <PopoverContent align="end" className="w-32">
                      <Button
                        className="w-full justify-start"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        variant="ghost"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={4}>
                Không tìm thấy công ty nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
