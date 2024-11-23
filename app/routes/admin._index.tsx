import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Calculator, Building2 } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
    },
    {
      title: "Products",
      value: "584",
      icon: Package,
      change: "+8%",
    },
    {
      title: "Active Quotes",
      value: "245",
      icon: Calculator,
      change: "+23%",
    },
    {
      title: "Customers",
      value: "432",
      icon: Building2,
      change: "+15%",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Activity list will go here */}
            <p className="text-sm text-muted-foreground">Recent user actions and system events will be displayed here</p>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Quick actions will go here */}
            <p className="text-sm text-muted-foreground">Common administrative tasks and shortcuts will be available here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}