import { useParams } from "@remix-run/react";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTable from "@/components/admin/services/ProductsTable";
import QuotesTable from "@/components/admin/services/QuotesTable";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ServiceDetails() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/services">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Service</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <ServiceForm />
              </TabsContent>
              <TabsContent value="products">
                <ProductsTable />
              </TabsContent>
              <TabsContent value="quotes">
                <QuotesTable />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}