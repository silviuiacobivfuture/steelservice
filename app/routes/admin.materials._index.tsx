import { useState } from "react";
import MaterialsTable from "@/components/admin/materials/MaterialsTable";
import MaterialsHeader from "@/components/admin/materials/MaterialsHeader";
import { useSearchParams } from "@remix-run/react";

export default function MaterialsAdmin() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <div className="p-8">
      <MaterialsHeader />
      <div className="mt-8">
        <MaterialsTable />
      </div>
    </div>
  );
}