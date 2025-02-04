import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2 text-primary" />
              <span>support@ourstore.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-2 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <span>123 Fashion St, Style City, ST 12345</span>
            </div>
          </div>
        </div>
        <form className="space-y-4 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <Textarea id="message" placeholder="Your message here..." className="h-32" />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </div>

      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">FAQs</h2>
        <div className="space-y-4">
          {[
            {
              q: "What are your shipping rates?",
              a: "We offer free shipping on orders over $50. For orders under $50, a flat rate of $5 applies.",
            },
            { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email." },
            {
              q: "What is your return policy?",
              a: "We offer a 30-day return policy for most items. Please check our Returns page for more details.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

