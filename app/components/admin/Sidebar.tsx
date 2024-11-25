import { Link, useLocation } from "@remix-run/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  Calculator,
  Settings,
  Building2,
  Wrench,
  FileText,
  Database,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Building2, label: "Materials", href: "/admin/materials" },
  { icon: Wrench, label: "Services", href: "/admin/services" },
  { icon: Calculator, label: "Quotes", href: "/admin/quotes" },
  { icon: Database, label: "Attributes", href: "/admin/attributes" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SteelService</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="rounded-full bg-gray-800 w-8 h-8" />
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}