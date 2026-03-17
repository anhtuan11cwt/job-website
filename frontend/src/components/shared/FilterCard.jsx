import { Filter, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  clearFilters,
  filterJobs,
  setFilterByLocation,
  setFilterByRole,
  setFilterBySalary,
} from "@/redux/jobSlice";
import { FILTER_DATA } from "@/utils/constant";

function FilterCard() {
  const dispatch = useDispatch();
  const { selectedLocation, selectedRole, selectedSalary } = useSelector(
    (store) => store.job,
  );

  const handleLocationChange = (value) => {
    dispatch(setFilterByLocation(value));
    dispatch(filterJobs());
  };

  const handleRoleChange = (value) => {
    dispatch(setFilterByRole(value));
    dispatch(filterJobs());
  };

  const handleSalaryChange = (value) => {
    dispatch(setFilterBySalary(value));
    dispatch(filterJobs());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = selectedLocation || selectedRole || selectedSalary;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-700" />
          <h1 className="font-bold text-lg">Lọc công việc</h1>
        </div>
        {hasActiveFilters && (
          <Button
            className="text-xs text-gray-500 hover:text-red-500"
            onClick={handleClearFilters}
            size="sm"
            variant="ghost"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Xóa lọc
          </Button>
        )}
      </div>
      <hr className="mb-4 border-gray-100" />
      <div className="space-y-4">
        {FILTER_DATA.map((filter) => (
          <div key={filter.filterType}>
            <h2 className="font-semibold text-sm mb-3 text-gray-700">
              {filter.filterType}
            </h2>
            <RadioGroup
              className="space-y-2"
              defaultValue=""
              onValueChange={
                filter.filterType === "Địa điểm"
                  ? handleLocationChange
                  : filter.filterType === "Ngành nghề"
                    ? handleRoleChange
                    : handleSalaryChange
              }
              value={
                filter.filterType === "Địa điểm"
                  ? selectedLocation
                  : filter.filterType === "Ngành nghề"
                    ? selectedRole
                    : selectedSalary
              }
            >
              {filter.array.map((item) => (
                <div
                  className="flex items-center space-x-2"
                  key={`${filter.filterType}-${item}`}
                >
                  <RadioGroupItem
                    id={`${filter.filterType}-${item}`}
                    value={item}
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
