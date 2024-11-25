import { Link } from '@remix-run/react';
import { Building2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { User } from '@/types';

const Navbar = ({ user }: { user: User }) => {
  console.log(user, '@@@@@@@@@user');
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">SteelService</span>
          </Link>
          <DesktopNav />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link to="/quote">
              <FileText className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                 0
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
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;