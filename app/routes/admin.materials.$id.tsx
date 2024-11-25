import { useParams } from "@remix-run/react";
import MaterialForm from "@/components/admin/materials/MaterialForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTable from "@/components/admin/materials/ProductsTable";
import AttributesTable from "@/components/admin/materials/AttributesTable";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function MaterialDetails() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/materials">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Materials
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Material</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attributes">Technical Attributes</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <MaterialForm />
              </TabsContent>
              <TabsContent value="attributes">
                <AttributesTable />
              </TabsContent>
              <TabsContent value="products">
                <ProductsTable />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}