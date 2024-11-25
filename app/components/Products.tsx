import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Scissors, Truck } from 'lucide-react';

const Products = () => {
  const products = [
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Steel Plates',
      description: 'High-quality steel plates in various grades and specifications.',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80',
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: 'Processing Services',
      description: 'Custom cutting, forming, and heat treatment services.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Distribution',
      description: 'Nationwide delivery and logistics solutions.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Steel Products</h2>
          <p className="text-muted-foreground">
            Committed to Serving Customers Across the World
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.title}>
              <CardHeader>
                <div className="mb-4">{product.icon}</div>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;