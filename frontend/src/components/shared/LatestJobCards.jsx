import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { daysAgoFunction, formatCurrency } from "@/utils/utils";

function LatestJobCards({ job }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{job?.company?.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {job?.location}
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {daysAgoFunction(job?.createdAt)}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="font-bold text-gray-800 mb-1">{job?.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          className="text-blue-700 bg-blue-50 hover:bg-blue-100"
          variant="ghost"
        >
          {job?.position} Vị trí
        </Badge>
        <Badge
          className="text-red-600 bg-red-50 hover:bg-red-100"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-purple-700 bg-purple-50 hover:bg-purple-100"
          variant="ghost"
        >
          {formatCurrency(job?.salary)}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
