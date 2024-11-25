import { useState } from "react";
import QuotesTable from "@/components/admin/quotes/QuotesTable";
import QuotesHeader from "@/components/admin/quotes/QuotesHeader";
import { useSearchParams } from "@remix-run/react";

export default function QuotesAdmin() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  return (
    <div className="p-8">
      <QuotesHeader />
      <div className="mt-8">
        <QuotesTable />
      </div>
    </div>
  );
}