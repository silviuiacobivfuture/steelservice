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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RequestMessage {
  id: string;
  message: string;
  satisfied: boolean;
  quote: {
    id: string;
    client: {
      profile: {
        firstName: string;
        lastName: string;
      };
    };
  };
  createdAt: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const messages: RequestMessage[] = [
    {
      id: '1',
      message: 'Please provide material certificates for the steel plates.',
      satisfied: false,
      quote: {
        id: 'Q001',
        client: {
          profile: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      },
      createdAt: new Date().toISOString(),
    },
  ];

  return json({ messages });
}

export default function MessagesPage() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quote Messages</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search messages..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="satisfied">Satisfied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>#{message.quote.id}</TableCell>
                <TableCell>
                  {message.quote.client.profile.firstName} {message.quote.client.profile.lastName}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {message.message}
                </TableCell>
                <TableCell>
                  <Badge variant={message.satisfied ? "success" : "secondary"}>
                    {message.satisfied ? "Satisfied" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/messages/${message.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    {!message.satisfied && (
                      <Button variant="ghost" size="sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
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