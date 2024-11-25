import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, ExternalLink, FileText, Image } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Asset {
  id: string;
  type: 'product_image' | 'quote_documentation' | 'invoice';
  assetUrl: string;
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const assets: Asset[] = [
    {
      id: '1',
      type: 'product_image',
      assetUrl: 'https://example.com/image.jpg',
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ assets });
}

export default function AssetsPage() {
  const { assets } = useLoaderData<typeof loader>();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product_image':
        return 'default';
      case 'quote_documentation':
        return 'secondary';
      case 'invoice':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product_image':
        return <Image className="h-4 w-4" />;
      case 'quote_documentation':
        return <FileText className="h-4 w-4" />;
      case 'invoice':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Assets</h1>
        <Button asChild>
          <Link to="/admin/assets/new">
            <Plus className="h-4 w-4 mr-2" />
            Upload Asset
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assets..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="product_image">Product Images</SelectItem>
            <SelectItem value="quote_documentation">Documentation</SelectItem>
            <SelectItem value="invoice">Invoices</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  {asset.type === 'product_image' ? (
                    <img
                      src={asset.assetUrl}
                      alt="Asset preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                      {getTypeIcon(asset.type)}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeColor(asset.type)}>
                    {asset.type.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {asset.assetUrl}
                </TableCell>
                <TableCell>
                  {new Date(asset.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={asset.assetUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/assets/${asset.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}