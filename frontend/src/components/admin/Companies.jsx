import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";
import CompaniesTable from "./CompaniesTable";

function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const [filter, setFilter] = useState("");

  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(filter));
  }, [filter, dispatch]);

  const filteredCompanies = companies?.filter((company) =>
    company.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-64"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Lọc theo tên"
          value={filter}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          Thêm công ty
        </Button>
      </div>
      <CompaniesTable companies={filteredCompanies} />
    </div>
  );
}

export default Companies;
