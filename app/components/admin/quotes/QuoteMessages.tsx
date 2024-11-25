import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function QuoteMessages() {
  const messages = [
    {
      id: "1",
      message: "Please provide material certificates for the steel plates.",
      satisfied: true,
      date: "2024-03-15 10:30",
    },
    {
      id: "2",
      message: "Need confirmation on delivery timeline.",
      satisfied: false,
      date: "2024-03-15 11:45",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 border rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{msg.date}</div>
              <Badge variant={msg.satisfied ? "success" : "secondary"}>
                {msg.satisfied ? "Satisfied" : "Pending"}
              </Badge>
            </div>
            <p>{msg.message}</p>
            {!msg.satisfied && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Satisfied
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Type a new message..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button>Send Message</Button>
        </div>
      </div>
    </div>
  );
}