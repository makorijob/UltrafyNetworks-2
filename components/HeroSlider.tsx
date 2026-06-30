// HeroSlider.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Phone, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  badge: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Reliable",
    subtitle: "Networking",
    description: "Professional networking, CCTV, fiber and structured cabling solutions.",
    image: "/slider/slide1.jpg",
    cta_text: "Our Services",
    cta_link: "/services",
    badge: "Featured",
  },
  {
    id: 2,
    title: "Business",
    subtitle: "Connectivity",
    description: "Enterprise-grade networking for businesses of every size.",
    image: "/slider/slide2.jpg",
    cta_text: "Contact Us",
    cta_link: "/contact",
    badge: "Trusted",
  },
  {
    id: 3,
    title: "Security",
    subtitle: "Solutions",
    description: "Modern surveillance and secure network infrastructure.",
    image: "/slider/slide3.jpg",
    cta_text: "Learn More",
    cta_link: "/services",
    badge: "24/7",
  },
  {
    id: 4,
    title: "Fiber",
    subtitle: "Installation",
    description: "High-speed fiber deployment and maintenance services.",
    image: "/slider/slide4.jpg",
    cta_text: "Get Quote",
    cta_link: "/contact",
    badge: "Fast",
  },
  {
    id: 5,
    title: "Ultrafy",
    subtitle: "Networks",
    description: "Delivering reliable technology solutions with unmatched support.",
    image: "/slider/slide5.jpg",
    cta_text: "Get Started",
    cta_link: "/contact",
    badge: "Premium",
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = slides[currentSlide];

  return (
    <div className="relative h-screen min-h-[550px] overflow-hidden">
      <img src={current.image} className="absolute inset-0 w-full h-full object-cover" alt={current.title}/>
      <div className="absolute inset-0 bg-black/60"/>
      <div className="relative z-10 flex h-full items-center max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white">
          <span className="inline-block rounded-full bg-emerald-600 px-4 py-2 mb-4">{current.badge}</span>
          <h1 className="text-6xl font-bold">{current.title}<br/><span className="text-emerald-400">{current.subtitle}</span></h1>
          <p className="mt-6 text-lg">{current.description}</p>
          <div className="flex gap-4 mt-8">
            <a href={current.cta_link} className="bg-emerald-600 px-6 py-3 rounded-full flex items-center gap-2">{current.cta_text}<ArrowRight size={18}/></a>
            <a href="tel:0740121382" className="border px-6 py-3 rounded-full flex items-center gap-2"><Phone size={18}/>0740121382</a>
          </div>
        </div>
      </div>
      <button onClick={()=>setCurrentSlide((currentSlide-1+slides.length)%slides.length)} className="absolute left-4 top-1/2 text-white"><ChevronLeft size={36}/></button>
      <button onClick={()=>setCurrentSlide((currentSlide+1)%slides.length)} className="absolute right-4 top-1/2 text-white"><ChevronRight size={36}/></button>
      <button onClick={()=>setIsPlaying(!isPlaying)} className="absolute bottom-6 right-6 text-white">
        {isPlaying ? <Pause/> : <Play/>}
      </button>
    </div>
  );
}
