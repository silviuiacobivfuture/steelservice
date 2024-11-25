import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Building2 } from 'lucide-react';

const Footer = () => {
  const links = {
    products: [
      'Steel Plates',
      'Carbon Steel',
      'Stainless Steel',
      'Alloy Steel',
      'Special Grades',
    ],
    services: [
      'Processing',
      'Cutting Services',
      'Heat Treatment',
      'Distribution',
      'Technical Support',
    ],
    company: [
      'About Us',
      'Careers',
      'Locations',
      'Contact',
      'Sustainability',
    ],
    resources: [
      'Technical Data',
      'Case Studies',
      'News & Updates',
      'Blog',
      'FAQs',
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-200 mt-auto">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">SteelService</h3>
            </div>
            <p className="mb-6 text-gray-400">
              North America's leading steel plate supplier, providing quality products and services since 1970.
            </p>
            <div className="flex gap-4">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-white capitalize">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2024 SteelService. All rights reserved.
          </div>

          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;