import PromoCarousel from '../PromoCarousel';

// Mock images for demo
const mockImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
];

export default function PromoCarouselExample() {
  return (
    <div className="p-4 bg-background">
      <PromoCarousel images={mockImages} />
    </div>
  );
}
