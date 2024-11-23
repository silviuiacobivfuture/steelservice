import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import MaterialForm from "@/components/admin/materials/MaterialForm";

export default function NewMaterial() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
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
            <CardTitle>New Material</CardTitle>
          </CardHeader>
          <CardContent>
            <MaterialForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}