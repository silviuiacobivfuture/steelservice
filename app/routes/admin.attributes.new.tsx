import AttributeForm from "@/components/admin/attributes/AttributeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NewAttribute() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
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
            <CardTitle>New Technical Attribute</CardTitle>
          </CardHeader>
          <CardContent>
            <AttributeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}