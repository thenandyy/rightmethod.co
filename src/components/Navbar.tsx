import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../data/rightmethodData';
import RightMethodLogo from './RightMethodLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-2.5 sm:top-3 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pointer-events-none">
      {/* Liquid Glass Floating Header Container */}
      <div
        className={`pointer-events-auto mx-auto flex h-14 max-w-[1340px] items-center justify-between gap-4 sm:gap-6 rounded-full px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'bg-white/[0.06] backdrop-blur-2xl border border-white/[0.16] shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)]'
            : 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.10] shadow-[0_8px_30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]'
        }`}
      >
        {/* Zone 1: Proportional Official Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="rightmethod home"
          className="inline-flex items-center whitespace-nowrap shrink-0 transition-opacity hover:opacity-85 -ml-1"
        >
          <RightMethodLogo className="h-7 sm:h-8 w-auto" />
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-[13px] font-normal text-white/70"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.sectionId}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <a
            href="#partner-cta"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#partner-cta');
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] font-medium text-black whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#2c86f6] hover:border-[#2c86f6] hover:text-white"
          >
            <span>Partner with us</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
