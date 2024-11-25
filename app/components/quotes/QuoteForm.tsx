import { useState } from 'react';
import { Form } from '@remix-run/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import QuoteTypeSection from './QuoteTypeSection';
import QuoteProductSection from './QuoteProductSection';
import QuoteDocumentSection from './QuoteDocumentSection';

interface QuoteFormProps {
  quoteTypes: Array<{ id: string; name: string }>;
  services: Array<{ id: string; name: string }>;
}

export interface QuoteProduct {
  id: string;
  productId: string;
  quantity: number;
  services: string[];
  specifications: Record<string, string>;
}

export default function QuoteForm({ quoteTypes, services }: QuoteFormProps) {
  const [products, setProducts] = useState<QuoteProduct[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleAddProduct = () => {
    setProducts(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        productId: '',
        quantity: 1,
        services: [],
        specifications: {},
      },
    ]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <Form method="post" className="space-y-8">
      <QuoteTypeSection quoteTypes={quoteTypes} />
      
      <QuoteProductSection
        products={products}
        services={services}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
      />

      <QuoteDocumentSection
        files={files}
        onFileChange={handleFileChange}
      />

      <div className="flex gap-4 justify-end">
        <Button variant="outline" type="button">
          Save as Draft
        </Button>
        <Button type="submit">
          Submit Quote Request
        </Button>
      </div>
    </Form>
  );
}