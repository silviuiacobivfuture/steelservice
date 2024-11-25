import { useState } from 'react';
import { Link } from '@remix-run/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Building2, Menu, ChevronDown } from 'lucide-react';
import { menuItems } from '@/lib/db/menu';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex items-center gap-2 p-4 border-b">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SteelService</span>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {Object.entries(menuItems).map(([category, { icon: Icon, items }]) => (
            <div key={category} className="border-b">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full p-4 text-left hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openCategories.includes(category) ? "rotate-180" : ""
                  )}
                />
              </button>
              {openCategories.includes(category) && (
                <div className="bg-muted/50 px-4 py-2">
                  {items.map((section) => (
                    <div key={section.title} className="mb-4">
                      <h3 className="text-sm font-medium mb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.links.map((link) => (
                          <li key={link}>
                            <Link
                              to="#"
                              className="block rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-4 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;