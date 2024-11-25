import { json, type ActionFunctionArgs } from '@remix-run/node';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // TODO: Implement contact form submission
  return json({ success: true });
}

export default function ContactPage() {
  const { ref: mapRef, inView: mapInView } = useInView({ triggerOnce: true });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Have questions about our products or services? Our team is here to help you find the perfect solution for your needs.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={cn(
              "space-y-8 transition-all duration-1000 transform",
              formInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form method="post" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div
            ref={infoRef}
            className={cn(
              "space-y-8 transition-all duration-1000 transform",
              infoInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-lg p-3">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">123 Steel Avenue</p>
                  <p className="text-muted-foreground">Pittsburgh, PA 15222</p>
                  <p className="text-muted-foreground">United States</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-lg p-3">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-muted-foreground">Mon-Fri from 8am to 5pm EST</p>
                  <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-lg p-3">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-muted-foreground">Send us an email anytime</p>
                  <a href="mailto:contact@steelservice.com" className="text-primary hover:underline">
                    contact@steelservice.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-lg p-3">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p className="text-muted-foreground">8:00 AM - 5:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        ref={mapRef}
        className={cn(
          "w-full h-[400px] transition-all duration-1000",
          mapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12141.028141225516!2d-79.99650221151311!3d40.44089236901721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f15733221959%3A0x3e3c0b00be771abd!2sPittsburgh%2C%20PA%2015222!5e0!3m2!1sen!2sus!4v1709913428044!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}