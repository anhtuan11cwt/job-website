import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FILTER_DATA } from "@/utils/constant";

function FilterCard() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-700" />
        <h1 className="font-bold text-lg">Lọc công việc</h1>
      </div>
      <hr className="mb-4 border-gray-100" />
      <div className="space-y-4">
        {FILTER_DATA.map((filter) => (
          <div key={filter.filterType}>
            <h2 className="font-semibold text-sm mb-3 text-gray-700">
              {filter.filterType}
            </h2>
            <RadioGroup className="space-y-2" defaultValue="">
              {filter.array.map((item) => (
                <div
                  className="flex items-center space-x-2"
                  key={`${filter.filterType}-${item}`}
                >
                  <RadioGroupItem
                    id={`${filter.filterType}-${item}`}
                    value={item.toLowerCase().replace(/\s+/g, "-")}
                  />
                  <Label
                    className="text-sm text-gray-600 cursor-pointer"
                    htmlFor={`${filter.filterType}-${item}`}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;
