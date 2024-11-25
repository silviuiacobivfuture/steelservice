import { useParams } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteDetails from "@/components/admin/quotes/QuoteDetails";
import QuoteProducts from "@/components/admin/quotes/QuoteProducts";
import QuoteDocuments from "@/components/admin/quotes/QuoteDocuments";
import QuoteMessages from "@/components/admin/quotes/QuoteMessages";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function QuoteDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/admin/quotes">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Quotes
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <QuoteDetails />
              </TabsContent>
              <TabsContent value="products">
                <QuoteProducts />
              </TabsContent>
              <TabsContent value="documents">
                <QuoteDocuments />
              </TabsContent>
              <TabsContent value="messages">
                <QuoteMessages />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}