import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import GetInTouch from '@/components/GetInTouch';

interface Service {
  id: string;
  name: string;
  description?: string;
  productServices: Array<{
    product: {
      description: string;
    };
  }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma query
  const services: Service[] = [
    {
      id: '1',
      name: 'Plasma Cutting',
      description: 'High-precision plasma cutting services for steel plates up to 150mm thickness.',
      productServices: [
        { product: { description: 'Carbon Steel Plate' } },
        { product: { description: 'Stainless Steel Plate' } },
      ],
    },
    // Add more mock services...
  ];

  return json({ services });
}

export default function ServicesPage() {
  const { services } = useLoaderData<typeof loader>();

  const features = [
    {
      title: 'State-of-the-Art Equipment',
      description: 'Using the latest technology for precise and efficient processing',
    },
    {
      title: 'Expert Team',
      description: 'Skilled professionals with years of industry experience',
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control and testing procedures',
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick processing times and reliable delivery schedules',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Processing Services</h1>
            <p className="text-lg opacity-90 mb-8">
              Comprehensive steel processing solutions tailored to your needs
            </p>
            <Button variant="secondary">Request Quote</Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From cutting and forming to surface treatment and heat processing, we offer a complete range of steel processing services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Compatible Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.productServices.map((ps, index) => (
                        <Badge key={index} variant="secondary">
                          {ps.product.description}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full group">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Custom Processing?</h2>
            <p className="text-muted-foreground mb-8">
              Our team of experts is ready to help you with your specific requirements
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Contact Sales</Button>
              <Button variant="outline">View Capabilities</Button>
            </div>
          </div>
        </div>
      </div>

      <GetInTouch />
    </div>
  );
}