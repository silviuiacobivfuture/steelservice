import { useState } from "react";
import ServicesTable from "@/components/admin/services/ServicesTable";
import ServicesHeader from "@/components/admin/services/ServicesHeader";
import { useSearchParams } from "@remix-run/react";

export default function ServicesAdmin() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <div className="p-8">
      <ServicesHeader />
      <div className="mt-8">
        <ServicesTable />
      </div>
    </div>
  );
}