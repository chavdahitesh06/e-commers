"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const deals = [
  {
    title: "Men's Top Deals",
    subtitle: "Exclusive Offers for Men!",
    description: "Find the best prices on men's fashion, from shirts to suits, and everything in between.",
    image: "/web/public/images.png", 
    href: "/deals/men",
  },
  {
    title: "Women's Top Deals",
    subtitle: "Stylish Picks Just for You!",
    description: "Shop the latest trends in women's clothing and accessories at unbeatable prices.",
    image: "/web/public/download (1).png",
    href: "/deals/women",
  },
  {
    title: "Kids' Top Deals",
    subtitle: "Best Deals for Little Ones!",
    description: "Browse fun and affordable deals for kids' clothing, toys, and more.",
    image: "/images/kids-deals.jpg",
    href: "/deals/kids",
  },
  {
    title: "Electronics Deals",
    subtitle: "Tech Gadgets at Unbeatable Prices!",
    description: "Grab the latest smartphones, laptops, and other tech gadgets at discounted prices.",
    image: "/images/electronics-deals.jpg",
    href: "/deals/electronics",
  },
];

export default function TopDealsSlider() {
  return (
    <section className="py-16 px-4 bg-[#f9f9f9]">
      <h2 className="text-4xl font-extrabold text-center text-[#333333] mb-10">
        Top Deals You Can't Miss!
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1} // Show only one slide at a time
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="max-w-6xl mx-auto"
      >
        {deals.map((deal, index) => (
          <SwiperSlide key={index}>
            <Link href={deal.href} className="group block">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-3xl font-semibold mb-2">{deal.title}</h3>
                  <p className="text-lg font-medium mb-4">{deal.subtitle}</p>
                  <p className="text-sm font-light mb-6">{deal.description}</p>
                  <span className="bg-white text-[#0a0b0b] py-2 px-6 rounded-full font-bold uppercase tracking-wider border-2 border-[#caccce] hover:bg-[#959ea3] hover:text-white transition-colors duration-300">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
