import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText } from 'lucide-react';

interface Quote {
  id: string;
  type: {
    name: string;
  };
  status: string;
  products: Array<{
    product: {
      description: string;
      material: {
        name: string;
      };
    };
    quantity: number;
    services: Array<{
      service: {
        name: string;
      };
    }>;
  }>;
  quoteeInput: {
    comment?: string;
    quoteeInternalReference?: string;
  };
  technicalDocuments: Array<{
    asset: {
      assetUrl: string;
    };
  }>;
  createdAt: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const quote: Quote = {
    id: params.id!,
    type: { name: 'Standard Quote' },
    status: 'analysis',
    products: [
      {
        product: {
          description: 'Carbon Steel Plate',
          material: { name: 'Carbon Steel' },
        },
        quantity: 2,
        services: [
          { service: { name: 'Cutting' } },
        ],
      },
    ],
    quoteeInput: {
      comment: 'Urgent delivery needed',
      quoteeInternalReference: 'PO-2024-001',
    },
    technicalDocuments: [
      { asset: { assetUrl: '/documents/specs.pdf' } },
    ],
    createdAt: new Date().toISOString(),
  };

  return json({ quote });
}

export default function QuoteDetailPage() {
  const { quote } = useLoaderData<typeof loader>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'analysis':
        return 'warning';
      case 'offer':
        return 'primary';
      case 'accepted':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quote #{quote.id}</h1>
            <div className="flex items-center gap-4">
              <Badge>{quote.type.name}</Badge>
              <Badge variant={getStatusColor(quote.status)}>
                {quote.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created on {new Date(quote.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          {quote.status === 'draft' && (
            <Button>
              Submit Quote
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Requested products and services</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Services</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.product.description}</TableCell>
                      <TableCell>{product.product.material.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {product.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary">
                              {service.service.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quote.quoteeInput.quoteeInternalReference && (
                <div>
                  <h4 className="font-medium mb-1">Reference Number</h4>
                  <p>{quote.quoteeInput.quoteeInternalReference}</p>
                </div>
              )}
              {quote.quoteeInput.comment && (
                <div>
                  <h4 className="font-medium mb-1">Comments</h4>
                  <p>{quote.quoteeInput.comment}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quote.technicalDocuments.map((doc, index) => (
                  <Button key={index} variant="outline" className="w-full" asChild>
                    <Link to={doc.asset.assetUrl}>
                      <FileText className="h-4 w-4 mr-2" />
                      Technical Document {index + 1}
                      <Download className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}