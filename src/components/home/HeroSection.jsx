import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowDown,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null)];

  const slides = [
    {
      id: 'fruits',
      title: "Chitti's Fresh Fruit Basket",
      tagline: 'Hand-picked Ratnagiri Alphonso, Pomegranate & Orchard Harvest',
      videoSrc: '/videos/Fruit_basket.mp4',
      poster: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=85',
      primaryBtnText: 'Shop Fresh Fruits',
      primaryBtnLink: '/fruits',
      secondaryBtnText: 'View All Baskets',
      secondaryBtnLink: '/shop?category=fruit-baskets',
    },
    {
      id: 'vegetables',
      title: 'Vegetables Assembling in Basket',
      tagline: 'Dawn-harvested Greens, Country Carrots, Vine Tomatoes & Farm Crates',
      videoSrc: '/videos/Vegetables_assembling_in_bascket.mp4',
      poster: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85',
      primaryBtnText: 'Explore Vegetables',
      primaryBtnLink: '/vegetables',
      secondaryBtnText: 'Weekly Veg Crates',
      secondaryBtnLink: '/shop?category=vegetable-baskets',
    },
  ];

  // Sync scroll position with currentIndex
  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const width = container.clientWidth;
    container.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  // Handle native scroll/swipe inside container
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const width = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
      setCurrentIndex(newIndex);
    }
  };

  // Ensure active video is playing and other is paused
  useEffect(() => {
    videoRefs.forEach((ref, idx) => {
      if (ref.current) {
        if (idx === currentIndex) {
          ref.current.currentTime = 0;
          ref.current.play().catch(() => {});
        } else {
          ref.current.pause();
        }
      }
    });
    setIsPlaying(true);
  }, [currentIndex]);

  const togglePlay = () => {
    const activeVideo = videoRefs[currentIndex]?.current;
    if (!activeVideo) return;
    if (isPlaying) {
      activeVideo.pause();
      setIsPlaying(false);
    } else {
      activeVideo.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const scrollToNextSection = () => {
    const benefitsSection = document.getElementById('benefits-section');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[calc(100vh-76px)] min-h-[580px] max-h-[960px] bg-black overflow-hidden select-none">
      {/* Horizontal Scroll Snap Container for Videos */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 snap-start snap-always relative bg-black"
            style={{ width: '100%' }}
          >
            {/* Full-bleed Edge-to-Edge Video */}
            <video
              ref={videoRefs[index]}
              poster={slide.poster}
              autoPlay={index === 0}
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center pointer-events-none"
            >
              <source src={slide.videoSrc} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

            {/* Subtle cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Top Floating Glass Navigation Badge & Controls */}
      <div className="absolute top-5 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-auto">
        {/* Left: Video Tabs (Scroll Indicators) */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(idx)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentIndex === idx
                  ? 'bg-brand-fresh text-white shadow-soft-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{idx === 0 ? '🍎 Fruit Basket' : '🥦 Vegetables Basket'}</span>
            </button>
          ))}
        </div>

        {/* Right: Sound & Play Controls */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Left / Right Carousel Arrow Buttons */}
      <button
        type="button"
        onClick={() => scrollToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 items-center justify-center transition-all hover:scale-110 shadow-lg"
        aria-label="Previous video"
      >
        <ChevronLeft className="w-6 h-6 -ml-0.5" />
      </button>

      <button
        type="button"
        onClick={() => scrollToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 items-center justify-center transition-all hover:scale-110 shadow-lg"
        aria-label="Next video"
      >
        <ChevronRight className="w-6 h-6 ml-0.5" />
      </button>

      {/* Bottom Minimalist Floating Overlay: Clean, Non-Intrusive & Actionable */}
      <div className="absolute bottom-6 inset-x-4 sm:inset-x-8 z-30 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        {/* Minimal Title & Slide Indicators */}
        <div className="text-center sm:text-left text-white max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-fresh animate-ping" />
            <span>100% Farm Fresh Harvest in Motion</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black font-serif text-white tracking-tight drop-shadow-md">
            {currentSlide.title}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 line-clamp-1 drop-shadow-sm font-sans">
            {currentSlide.tagline}
          </p>
        </div>

        {/* Action CTAs & Scroll Hint */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2.5">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 text-sm font-extrabold bg-brand-fresh hover:bg-[#388E3C] text-white shadow-fresh gap-2 backdrop-blur-sm"
            >
              <Link to={currentSlide.primaryBtnLink}>
                <ShoppingBag className="w-4 h-4" />
                <span>{currentSlide.primaryBtnText}</span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-5 text-sm font-bold bg-black/40 hover:bg-white hover:text-brand-dark text-white border-white/40 backdrop-blur-md"
            >
              <Link to={currentSlide.secondaryBtnLink}>
                <span>{currentSlide.secondaryBtnText}</span>
              </Link>
            </Button>
          </div>

          {/* Quick Scroll Down Arrow */}
          <button
            onClick={scrollToNextSection}
            className="hidden lg:flex w-11 h-11 rounded-full bg-black/40 hover:bg-brand-fresh text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all hover:scale-105"
            title="Scroll down to browse all produce"
            aria-label="Scroll down to explore"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Horizontal Swipe Scroll Hint on Mobile */}
      <div className="sm:hidden absolute bottom-1.5 inset-x-0 flex justify-center z-30 pointer-events-none">
        <span className="text-[10px] text-white/70 font-medium tracking-wide bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
          ← Swipe horizontally to switch videos →
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
