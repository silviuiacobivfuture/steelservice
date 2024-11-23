import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'What types of steel plates do you offer?',
      answer: 'We offer a wide range of steel plates including carbon steel, stainless steel, and alloy steel in various grades and specifications.',
    },
    {
      question: 'What are your processing capabilities?',
      answer: 'Our processing services include cutting, forming, and heat treatment, all performed with state-of-the-art equipment.',
    },
    {
      question: 'Do you offer nationwide delivery?',
      answer: 'Yes, we provide nationwide delivery services with our extensive logistics network.',
    },
    {
      question: 'How can I request a quote?',
      answer: 'You can request a quote through our online form, or contact our sales team directly.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg mb-4">
                <AccordionTrigger className="px-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;