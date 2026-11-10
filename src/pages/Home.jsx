import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ShoppingBenefits } from '@/components/home/ShoppingBenefits';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { BestSellingProducts } from '@/components/home/BestSellingProducts';
import { SeasonalBanner } from '@/components/home/SeasonalBanner';
import { FruitsCollection } from '@/components/home/FruitsCollection';
import { VegetablesCollection } from '@/components/home/VegetablesCollection';
import { PremiumBaskets } from '@/components/home/PremiumBaskets';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

export const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 5.A Hero Section */}
      <HeroSection />

      {/* 5.B Shopping Benefits */}
      <ShoppingBenefits />

      {/* 5.C Shop by Category */}
      <ShopByCategory />

      {/* 5.D Best Selling Products */}
      <BestSellingProducts />

      {/* 5.E Seasonal Collection Banner */}
      <SeasonalBanner />

      {/* 5.F Fresh Fruits Collection */}
      <FruitsCollection />

      {/* 5.G Fresh Vegetables Collection */}
      <VegetablesCollection />

      {/* 5.H Premium Baskets */}
      <PremiumBaskets />

      {/* 5.I Why Choose Chitti's Market? */}
      <WhyChooseUs />

      {/* 5.J Customer Testimonials */}
      <Testimonials />

      {/* 5.K Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
