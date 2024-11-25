import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Building2, Menu, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { menuItems } from '@/lib/db/menu';

const MobileMenu = () => {
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
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex items-center gap-2 p-4 border-b">
          <Building2 className="h-6 w-6 text-primary" />
          <SheetTitle className="text-xl font-bold">SteelService</SheetTitle>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {Object.entries(menuItems).map(([category, { icon: Icon, items }]) => (
            <div key={category} className="border-b">
              <button
                onClick={() => toggleCategory(category)}
                className="mobile-menu-item flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{category}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openCategories.includes(category) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openCategories.includes(category) && (
                <div className="bg-gray-50 px-4 py-2">
                  {items.map((section) => (
                    <div key={section.title} className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link}>
                            <Link
                              to="#"
                              className="mobile-menu-item text-sm text-gray-600 hover:text-primary flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                            >
                              <ChevronRight className="h-3 w-3" />
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setActiveItem(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveItem(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-6" ref={menuRef}>
      {Object.entries(menuItems).map(([category, { icon: Icon, items }]) => (
        <div
          key={category}
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
          className="relative group"
        >
          <button
            className={`nav-item flex items-center gap-2 ${
              activeItem === category ? 'text-primary' : ''
            }`}
            data-active={activeItem === category}
          >
            <Icon className="h-5 w-5" />
            {category}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
              activeItem === category ? 'rotate-180' : ''
            }`} />
          </button>

          <div
            className={`megamenu-container ${
              activeItem === category ? 'open' : ''
            }`}
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-3 gap-8">
                {items.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-medium text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <Link
                            to="#"
                            className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary transform scale-0 transition-transform group-hover:scale-100" />
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
};

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">SteelService</span>
          </Link>
          <DesktopMenu />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link to="/quote">
              <FileText className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                2
              </span>
            </Link>
          </Button>
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Register</Link>
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;