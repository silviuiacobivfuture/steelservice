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
  Globe,
  Building,
  LibraryBig,
  Ruler,
  FileStack,
  Briefcase,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Activity,
  FileBarChart,
  Map,
} from "lucide-react";
import { useState } from "react";

export const navGroups = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    ],
  },
  {
    label: "Catalog",
    icon: Package,
    items: [
      { 
        icon: Package, 
        label: "Products", 
        href: "/admin/products",
        subItems: [
          { label: "All Products", href: "/admin/products" },
          { label: "New Product", href: "/admin/products/new" },
        ]
      },
      { 
        icon: Building2, 
        label: "Materials", 
        href: "/admin/materials",
        subItems: [
          { label: "All Materials", href: "/admin/materials" },
          { label: "New Material", href: "/admin/materials/new" },
        ]
      },
      { 
        icon: Database, 
        label: "Attributes", 
        href: "/admin/attributes",
        subItems: [
          { label: "All Attributes", href: "/admin/attributes" },
          { label: "New Attribute", href: "/admin/attributes/new" },
        ]
      },
    ],
  },
  {
    label: "Sales",
    icon: Calculator,
    items: [
      { 
        icon: Calculator, 
        label: "Quotes", 
        href: "/admin/quotes",
        subItems: [
          { label: "All Quotes", href: "/admin/quotes" },
          { label: "New Quote", href: "/admin/quotes/new" },
        ]
      },
      { 
        icon: FileBarChart, 
        label: "Quote Types", 
        href: "/admin/quote-types",
        subItems: [
          { label: "All Types", href: "/admin/quote-types" },
          { label: "New Type", href: "/admin/quote-types/new" },
        ]
      },
      { 
        icon: MessageSquare, 
        label: "Messages", 
        href: "/admin/messages",
        subItems: [
          { label: "All Messages", href: "/admin/messages" },
        ]
      },
      { 
        icon: FileText, 
        label: "Documents", 
        href: "/admin/documents",
        subItems: [
          { label: "All Documents", href: "/admin/documents" },
          { label: "Upload Document", href: "/admin/documents/new" },
        ]
      },
    ],
  },
  {
    label: "Services",
    icon: Wrench,
    items: [
      { 
        icon: Wrench, 
        label: "Services", 
        href: "/admin/services",
        subItems: [
          { label: "All Services", href: "/admin/services" },
          { label: "New Service", href: "/admin/services/new" },
        ]
      },
    ],
  },
  {
    label: "Users & Organizations",
    icon: Users,
    items: [
      { 
        icon: Users, 
        label: "Users", 
        href: "/admin/users",
        subItems: [
          { label: "All Users", href: "/admin/users" },
          { label: "New User", href: "/admin/users/new" },
        ]
      },
      { 
        icon: Briefcase, 
        label: "Customers", 
        href: "/admin/customers",
        subItems: [
          { label: "All Customers", href: "/admin/customers" },
          { label: "New Customer", href: "/admin/customers/new" },
        ]
      },
      { 
        icon: ShieldCheck, 
        label: "Roles", 
        href: "/admin/roles",
        subItems: [
          { label: "All Roles", href: "/admin/roles" },
          { label: "New Role", href: "/admin/roles/new" },
        ]
      },
      { 
        icon: Building, 
        label: "Entity Types", 
        href: "/admin/entity-types",
        subItems: [
          { label: "All Entity Types", href: "/admin/entity-types" },
          { label: "New Entity Type", href: "/admin/entity-types/new" },
        ]
      },
      { 
        icon: Globe, 
        label: "Countries", 
        href: "/admin/countries",
        subItems: [
          { label: "All Countries", href: "/admin/countries" },
          { label: "New Country", href: "/admin/countries/new" },
        ]
      },
      { 
        icon: Map, 
        label: "Regions", 
        href: "/admin/regions",
        subItems: [
          { label: "All Regions", href: "/admin/regions" },
          { label: "New Region", href: "/admin/regions/new" },
        ]
      },
    ],
  },
  {
    label: "Assets",
    icon: LibraryBig,
    items: [
      { 
        icon: LibraryBig, 
        label: "Assets", 
        href: "/admin/assets",
        subItems: [
          { label: "All Assets", href: "/admin/assets" },
          { label: "Upload Asset", href: "/admin/assets/new" },
        ]
      },
    ],
  },
  {
    label: "System",
    icon: Settings,
    items: [
      { icon: Settings, label: "Settings", href: "/admin/settings" },
      { 
        icon: Ruler, 
        label: "Units", 
        href: "/admin/units",
        subItems: [
          { label: "All Units", href: "/admin/units" },
          { label: "New Unit", href: "/admin/units/new" },
        ]
      },
      { 
        icon: Calculator, 
        label: "Formulas", 
        href: "/admin/formulas",
        subItems: [
          { label: "All Formulas", href: "/admin/formulas" },
          { label: "New Formula", href: "/admin/formulas/new" },
        ]
      },
      { 
        icon: Activity, 
        label: "User Actions", 
        href: "/admin/user-actions",
        subItems: [
          { label: "All Actions", href: "/admin/user-actions" },
          { label: "Action Details", href: "/admin/user-actions/details" },
        ]
      },
    ],
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["Overview"]);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev => 
      prev.includes(groupLabel)
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  const toggleItem = (itemLabel: string) => {
    setOpenItems(prev => 
      prev.includes(itemLabel)
        ? prev.filter(i => i !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link to="/admin" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SteelService</span>
          </Link>
        </div>
        
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {navGroups.map((group) => (
              <li key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between text-sm font-semibold leading-6 text-gray-400 hover:text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <group.icon className="h-4 w-4" />
                    {group.label}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openGroups.includes(group.label) ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {openGroups.includes(group.label) && (
                  <ul className="mt-2 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href} className="space-y-1">
                        {item.subItems ? (
                          <>
                            <button
                              onClick={() => toggleItem(item.label)}
                              className={cn(
                                "flex w-full items-center justify-between rounded-md p-2 text-sm transition-colors",
                                location.pathname === item.href
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                {item.label}
                              </div>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  openItems.includes(item.label) ? "rotate-180" : ""
                                )}
                              />
                            </button>
                            {openItems.includes(item.label) && (
                              <ul className="pl-6 space-y-1">
                                {item.subItems.map((subItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      to={subItem.href}
                                      className={cn(
                                        "block rounded-md p-2 text-sm transition-colors",
                                        location.pathname === subItem.href
                                          ? "bg-primary/10 text-primary font-medium"
                                          : "text-gray-600 hover:bg-gray-50"
                                      )}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            to={item.href}
                            className={cn(
                              "flex items-center gap-2 rounded-md p-2 text-sm transition-colors",
                              location.pathname === item.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}