import { useState, useRef, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { ChevronDown } from 'lucide-react';
import { menuItems } from '@/lib/db/menu';
import { cn } from '@/lib/utils';

const DesktopNav = () => {
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
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle clicking outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center space-x-4" ref={menuRef}>
      {Object.entries(menuItems).map(([category, { icon: Icon, items }]) => (
        <div
          key={category}
          className="relative"
        >
          <button
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveItem(activeItem === category ? null : category)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              activeItem === category && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {category}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              activeItem === category && "rotate-180"
            )} />
          </button>

          {activeItem === category && (
            <div 
              className="absolute left-0 top-full z-50 w-[600px] rounded-md border bg-popover p-6 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid grid-cols-3 gap-6">
                {items.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-medium text-sm mb-3 text-foreground">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <Link
                            to="#"
                            className="block text-sm text-muted-foreground rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;