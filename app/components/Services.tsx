import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Plasma Cutting',
      description: 'High-precision plasma cutting services for steel plates up to 150mm thickness.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
      features: ['Precision cuts', 'Complex shapes', 'Fast turnaround'],
    },
    {
      title: 'CNC Drilling',
      description: 'Advanced CNC drilling capabilities for accurate hole placement and threading.',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80',
      features: ['Multiple hole sizes', 'Pattern drilling', 'Threading options'],
    },
    {
      title: 'Welding Services',
      description: 'Certified welding services for all types of steel plates and structures.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80',
      features: ['MIG/TIG welding', 'Certified welders', 'Quality testing'],
    },
    {
      title: 'Surface Treatment',
      description: 'Comprehensive surface preparation and treatment solutions.',
      image: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?auto=format&fit=crop&q=80',
      features: ['Shot blasting', 'Painting', 'Anti-corrosion'],
    },
    {
      title: 'Heat Treatment',
      description: 'Specialized heat treatment services for enhanced material properties.',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80',
      features: ['Annealing', 'Tempering', 'Stress relief'],
    },
    {
      title: 'Forming & Bending',
      description: 'Custom metal forming and bending services for various applications.',
      image: 'https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&q=80',
      features: ['Press brake forming', 'Roll bending', 'Custom shapes'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Processing Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art processing capabilities to meet your exact specifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{service.title}</CardTitle>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;