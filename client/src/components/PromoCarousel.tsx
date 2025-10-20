import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PromoCarouselProps {
  images: string[];
}

export default function PromoCarousel({ images }: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative" data-testid="promo-carousel">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`Promo ${currentIndex + 1}`}
          className="w-full h-40 object-cover"
        />
        <button
          data-testid="button-carousel-prev"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-1.5 rounded-full hover-elevate active-elevate-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          data-testid="button-carousel-next"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-1.5 rounded-full hover-elevate active-elevate-2"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            data-testid={`button-carousel-dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
