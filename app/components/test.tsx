"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function ElegantHoverCarousel() {
  const cardsRef = useRef([]);

  const handleEnter = (index : any) => {
    const card = cardsRef.current[index];

    // Animate hovered card forward
    gsap.to(card, {
      z: 100,
      scale: 1.15,
      duration: 0.6,
      ease: "power3.out",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    });

    // Blur and dim siblings
    cardsRef.current.forEach((other, i) => {
      if (i !== index) {
        gsap.to(other, {
          filter: "blur(6px) brightness(0.7)",
          scale: 0.95,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
  };

  const handleLeave = (index:any) => {
    const card = cardsRef.current[index];

    // Reset hovered card
    gsap.to(card, {
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    });

    // Reset siblings
    cardsRef.current.forEach((other) => {
      gsap.to(other, {
        filter: "blur(0px) brightness(1)",
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  };

  const cards = [
    { id: 1, image: "/images/card1.jpg", title: "Left Card" },
    { id: 2, image: "/images/card2.jpg", title: "Center Card" },
    { id: 3, image: "/images/card3.jpg", title: "Right Card" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 perspective-[1200px] py-12">
      {cards.map((card, i) => (
        <div
          key={card.id}
         
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={() => handleLeave(i)}
          className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 shadow-lg bg-gray-900"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-lg font-semibold">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
}