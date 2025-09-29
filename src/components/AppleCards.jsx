import React from "react";
import { Card, Carousel } from "./apple-cards-carousel";

export default function AppleCardsCarouselDemo({ data = [] }) {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
