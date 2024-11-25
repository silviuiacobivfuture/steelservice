import { useParams } from "@remix-run/react";
import AttributeForm from "@/components/admin/attributes/AttributeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialsTable from "@/components/admin/attributes/MaterialsTable";
import ProductsTable from "@/components/admin/attributes/ProductsTable";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function AttributeDetails() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/attributes">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Attributes
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Technical Attribute</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <AttributeForm />
              </TabsContent>
              <TabsContent value="materials">
                <MaterialsTable />
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