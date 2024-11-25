import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Star, Quote } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  category: string;
  image: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual data fetch
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Procurement Manager',
      company: 'Construction Co.',
      content: 'SteelService has consistently delivered high-quality steel products on time. Their quote management system has streamlined our procurement process significantly.',
      rating: 5,
      category: 'Product Quality',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Operations Director',
      company: 'Manufacturing Inc.',
      content: 'The technical support team at SteelService is exceptional. They helped us choose the right materials for our project and provided detailed specifications.',
      rating: 5,
      category: 'Technical Support',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80',
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Project Manager',
      company: 'Engineering Solutions',
      content: 'Their online platform makes it easy to request quotes and track orders. The ability to save and reuse previous quotes has saved us countless hours.',
      rating: 4,
      category: 'Platform Usability',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80',
    },
  ];

  return json({ testimonials });
}

export default function TestimonialsPage() {
  const { testimonials } = useLoaderData<typeof loader>();
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div 
          ref={headerRef}
          className={cn(
            "container text-center transition-all duration-1000",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="text-4xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            See what our customers have to say about their experience with SteelService
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Happy Customers', value: '500+' },
              { label: 'Projects Completed', value: '2,000+' },
              { label: 'Average Rating', value: '4.8/5' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "text-center transition-all duration-500",
                  headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  { 'delay-100': index === 1, 'delay-200': index === 2 }
                )}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container py-16">
        {/* Filters */}
        <div className="flex justify-end mb-8">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="quality">Product Quality</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="usability">Platform Usability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={contentRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={cn(
                "overflow-hidden transition-all duration-500 hover:shadow-lg",
                contentInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10",
                { 
                  'delay-100': index % 3 === 1, 
                  'delay-200': index % 3 === 2 
                }
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary" className="mb-4">
                  {testimonial.category}
                </Badge>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
                  <p className="text-muted-foreground relative z-10 pl-6">
                    {testimonial.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}