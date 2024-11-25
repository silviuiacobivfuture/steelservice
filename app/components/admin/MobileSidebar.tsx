import { Link, useLocation } from "@remix-run/react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navGroups } from "./Sidebar";
import { Building2, ChevronDown } from "lucide-react";

export default function MobileSidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["Overview"]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex h-full flex-col">
          <SheetHeader className="p-4 border-b border-gray-200">
            <SheetTitle asChild>
              <Link to="/admin" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SteelService</span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            <nav className="flex flex-1 flex-col py-4">
              {navGroups.map((group) => (
                <div key={group.label} className="mb-4">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {group.label}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform duration-200",
                        openGroups.includes(group.label) ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  
                  {openGroups.includes(group.label) && (
                    <ul className="mt-1 space-y-1">
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
                                        onClick={() => setOpen(false)}
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
                              onClick={() => setOpen(false)}
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
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div className="flex flex-col gap-4 border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}