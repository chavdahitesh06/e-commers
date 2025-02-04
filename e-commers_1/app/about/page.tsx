import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Our Store</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-6">
            Founded in 2010, our store has been at the forefront of fashion, bringing the latest trends to our
            customers. We believe in quality, style, and affordability.
          </p>
          <p className="text-lg mb-6">
            Our mission is to make every customer feel confident and stylish in what they wear, without breaking the
            bank.
          </p>
          <Button size="lg">Learn More</Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
          <Image src="/placeholder.svg?height=400&width=600" alt="Our store" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Quality", description: "We source only the best materials for our products." },
            { title: "Sustainability", description: "We're committed to reducing our environmental impact." },
            { title: "Customer First", description: "Your satisfaction is our top priority." },
          ].map((value, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-primary text-primary-foreground py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-semibold mb-6">Join Our Community</h2>
        <p className="text-lg mb-6">Stay updated with our latest collections and exclusive offers.</p>
        <Button size="lg" variant="secondary">
          Sign Up for Newsletter
        </Button>
      </div>
    </div>
  )
}

