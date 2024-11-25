import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from '@remix-run/react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
            Ready to Start Your Steel Project?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Get in touch with our experts for personalized solutions and competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group"
              asChild
            >
              <Link to="/quote">
                Request Quote 
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;