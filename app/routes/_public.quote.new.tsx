import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import QuoteForm from '@/components/quotes/QuoteForm';

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with actual Prisma queries
  const quoteTypes = [
    { id: 'standard', name: 'Standard Quote' },
    { id: 'rush', name: 'Rush Quote' },
  ];

  const services = [
    { id: 'cutting', name: 'Cutting' },
    { id: 'drilling', name: 'Drilling' },
    { id: 'welding', name: 'Welding' },
  ];

  return json({ quoteTypes, services });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement quote creation logic
  return json({ success: true });
}

export default function NewQuotePage() {
  const { quoteTypes, services } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">New Quote Request</h1>
        <QuoteForm quoteTypes={quoteTypes} services={services} />
      </div>
    </div>
  );
}