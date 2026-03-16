import { Banknote, Bookmark, Briefcase, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Job({ job }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/description/${job.id}`);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage alt={job.company} src={job.companyLogo} />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
              {job.company?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{job.company}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-0.5">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        <Button className="cursor-pointer" size="icon" variant="ghost">
          <Bookmark className="w-5 h-5 text-gray-500 hover:text-[#7209b7]" />
        </Button>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-gray-800 text-lg mb-1">{job.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="flex gap-3">
        <Button
          className="flex-1 bg-[#7209b7] hover:bg-[#5a06a0] cursor-pointer"
          onClick={handleDetailsClick}
        >
          Chi tiết
        </Button>
        <Button className="flex-1 cursor-pointer" variant="outline">
          Lưu sau
        </Button>
      </div>
    </div>
  );
}

export default Job;
