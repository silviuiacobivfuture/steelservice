import { useState } from "react";
import AttributesTable from "@/components/admin/attributes/AttributesTable";
import AttributesHeader from "@/components/admin/attributes/AttributesHeader";
import { useSearchParams } from "@remix-run/react";

export default function AttributesAdmin() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <div className="p-8">
      <AttributesHeader />
      <div className="mt-8">
        <AttributesTable />
      </div>
    </div>
  );
}