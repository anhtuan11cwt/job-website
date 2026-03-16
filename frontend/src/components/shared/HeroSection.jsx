import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">
              Trang Web Tìm Việc Số 1
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Tìm kiếm, Ứng tuyển & Chạm tay tới{" "}
            <span className="text-[#6A38C2]">Công việc mơ ước</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nền tảng kết nối ứng viên và nhà tuyển dụng hàng đầu, giúp bạn tìm
            thấy cơ hội nghề nghiệp phù hợp nhất để phát triển sự nghiệp.
          </p>

          <div className="max-w-3xl mx-auto mt-8">
            <div className="flex items-center bg-white shadow-lg border border-gray-100 rounded-full p-2">
              <Input
                className="border-none outline-none shadow-none focus-visible:ring-0 text-base pl-4"
                placeholder="Tìm kiếm công việc mơ ước của bạn ngay..."
                type="text"
              />
              <Button className="rounded-full bg-[#6A38C2] hover:bg-[#5a2fa8] px-8">
                <Search className="mr-2 h-4 w-4" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
