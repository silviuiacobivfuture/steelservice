import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Scale, Lock, FileText } from 'lucide-react';

export default function TermsPage() {
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true });

  const sections = [
    {
      icon: Shield,
      title: "1. Acceptance of Terms",
      content: `By accessing and using SteelService's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.`
    },
    {
      icon: Scale,
      title: "2. Use of Services",
      content: `Our services are available only to businesses and professionals in the steel industry. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.`
    },
    {
      icon: Lock,
      title: "3. Privacy & Security",
      content: `We take your privacy seriously. All personal and business information is handled according to our Privacy Policy. We implement various security measures to maintain the safety of your personal information.`
    },
    {
      icon: FileText,
      title: "4. Quotation Process",
      content: `Quotes provided through our platform are subject to availability and confirmation. Prices may vary based on market conditions, quantity, and specific requirements. All quotes are valid for the period specified in the quote.`
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="container mt-8">
        <p className="text-sm text-muted-foreground text-right">
          Last updated: March 15, 2024
        </p>
      </div>

      {/* Content Sections */}
      <div className="container py-12">
        <div 
          ref={contentRef}
          className={cn(
            "max-w-4xl mx-auto space-y-12 transition-all duration-1000",
            contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className={cn(
                "transition-all duration-500 delay-[var(--delay)]",
                contentInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
              style={{ '--delay': `${index * 200}ms` } as React.CSSProperties}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Terms */}
          <div 
            className={cn(
              "border-t pt-12 mt-12 transition-all duration-500",
              contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-xl font-semibold mb-6">Additional Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These terms and conditions constitute the entire agreement between you and SteelService regarding the use of our services.
              </p>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
              </p>
              <p>
                If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>
              <p>
                For any questions regarding these terms, please contact our support team at{' '}
                <a href="mailto:legal@steelservice.com" className="text-primary hover:underline">
                  legal@steelservice.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}