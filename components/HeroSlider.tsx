
"use client";

import {useEffect,useState} from "react";
import {ChevronLeft,ChevronRight,Pause,Play,Phone,ArrowRight} from "lucide-react";

type Slide={
 id:number;title:string;subtitle:string;description:string;image:string;cta_text:string;cta_link:string;badge:string;
};

const slides:Slide[]=[
{id:1,title:"Reliable",subtitle:"Networking",description:"Professional networking, CCTV, fiber and structured cabling solutions.",image:"/slider/slide1.jpg",cta_text:"Our Services",cta_link:"/services",badge:"FEATURED"},
{id:2,title:"Business",subtitle:"Connectivity",description:"Enterprise-grade networking solutions for modern businesses.",image:"/slider/slide2.jpg",cta_text:"Contact Us",cta_link:"/contact",badge:"TRUSTED"},
{id:3,title:"Security",subtitle:"Solutions",description:"Integrated surveillance, access control and secure infrastructure.",image:"/slider/slide3.jpg",cta_text:"Learn More",cta_link:"/services",badge:"24/7"},
{id:4,title:"Cloud",subtitle:"Infrastructure",description:"Scalable cloud and managed IT services that grow with your business.",image:"/slider/slide4.jpg",cta_text:"Get Quote",cta_link:"/contact",badge:"MODERN"},
{id:5,title:"Ultrafy",subtitle:"Networks",description:"Reliable technology solutions backed by professional support.",image:"/slider/slide5.jpg",cta_text:"Get Started",cta_link:"/contact",badge:"PREMIUM"},
];

export default function HeroSlider(){
 const [current,setCurrent]=useState(0);
 const [playing,setPlaying]=useState(true);

 useEffect(()=>{
   if(!playing) return;
   const t=setInterval(()=>setCurrent(v=>(v+1)%slides.length),5000);
   return ()=>clearInterval(t);
 },[playing]);

 const s=slides[current];

 return (
<div className="relative h-[calc(100vh-80px)] min-h-[650px] overflow-hidden bg-slate-950">
{slides.map((slide,i)=>(
<div key={slide.id} className={`absolute inset-0 transition-all duration-1000 ${i===current?"opacity-100 scale-100":"opacity-0 scale-110"}`}>
<img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover"/>
<div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-900/20"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
</div>
))}
<div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
<div className="max-w-3xl text-white">
<div className="mb-6 inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-2 backdrop-blur">
<span className="text-sm font-semibold tracking-[0.2em] text-emerald-300">{s.badge}</span>
</div>
<h1 className="text-5xl font-black leading-tight md:text-7xl">{s.title}<br/><span className="text-emerald-400">{s.subtitle}</span></h1>
<p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">{s.description}</p>
<div className="mt-10 flex flex-wrap gap-4">
<a href={s.cta_link} className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-600">{s.cta_text}<ArrowRight size={18}/></a>
<a href="tel:0740121382" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 backdrop-blur transition hover:bg-white/20"><Phone size={18}/>0740121382</a>
</div>
<div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
{[
["500+","Projects"],
["24/7","Support"],
["10+","Years"]
].map(([n,l])=>(
<div key={l} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
<div className="text-3xl font-bold text-emerald-400">{n}</div>
<div className="mt-1 text-sm text-slate-300">{l}</div>
</div>
))}
</div>
</div>
</div>

<div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
{slides.map((_,i)=>(
<button key={i} onClick={()=>setCurrent(i)} className={`h-2 rounded-full transition-all ${i===current?"w-12 bg-emerald-400":"w-4 bg-white/40"}`}/>
))}
</div>

<button onClick={()=>setCurrent((current-1+slides.length)%slides.length)} className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/20"><ChevronLeft/></button>
<button onClick={()=>setCurrent((current+1)%slides.length)} className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/20"><ChevronRight/></button>
<button onClick={()=>setPlaying(!playing)} className="absolute right-6 bottom-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/20">{playing?<Pause/>:<Play/>}</button>
</div>);
}
