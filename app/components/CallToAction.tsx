import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Steel Project?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Get in touch with our experts for personalized solutions and competitive pricing.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Request Quote <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;