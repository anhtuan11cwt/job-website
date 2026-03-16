import { Badge } from "@/components/ui/badge";

function AppliedJobTable({ jobs }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case "Selected":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày ứng tuyển
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vị trí
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Công ty
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr className="hover:bg-gray-50" key={job.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {job.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {job.jobRole}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {job.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Badge variant={getStatusVariant(job.status)}>
                  {job.status === "Selected"
                    ? "Đã chọn"
                    : job.status === "Pending"
                      ? "Đang chờ"
                      : "Bị từ chối"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobTable;
