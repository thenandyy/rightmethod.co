import { useState, type ChangeEvent } from 'react';
import { Film, X } from 'lucide-react';
import RightMethodLogo from './RightMethodLogo';
import { HERO_ORBIT_VIDEOS, type HeroOrbitVideoSlot } from '../data/rightmethodData';

interface OrbitCardProps {
  slot: HeroOrbitVideoSlot;
  onSelect: () => void;
  className?: string;
}

function OrbitVideoCard({ slot, onSelect, className = '' }: OrbitCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${slot.category} vertical preview slot ${slot.slotIndex}. Click to attach or replace video.`}
      className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-[7px] sm:rounded-[10px] border border-white/15 bg-[#070709] text-left shadow-[0_14px_38px_rgba(0,0,0,0.92)] transition-[border-color,transform] duration-300 hover:border-white/45 focus-visible:border-white/60 cursor-pointer ${className}`}
    >
      {slot.videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={slot.posterUrl}
          src={slot.videoUrl}
          className="h-full w-full object-cover grayscale-[32%] contrast-[1.06] brightness-[0.82] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.03]"
        />
      ) : (
        <img
          src={slot.posterUrl}
          alt={slot.category}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover grayscale-[45%] contrast-[1.08] brightness-[0.76] transition-all duration-500 group-hover:grayscale-[15%] group-hover:brightness-90 group-hover:scale-[1.03]"
        />
      )}

      {/* Subtle top-to-bottom cinematic vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/35"
      />

      {/* Minimal top slot number */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-1.5 sm:px-2.5 pt-1 sm:pt-2">
        <span className="font-mono text-[7.5px] sm:text-[9px] tracking-[0.14em] text-white/60 tabular-nums">
          {slot.slotIndex}
        </span>
        <span className="hidden md:inline font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/0 transition-colors duration-200 group-hover:text-white/65">
          9:16
        </span>
      </div>

      {/* Bottom category label — visible on larger frames, clean visual portrait on compact mobile */}
      <div className="pointer-events-none hidden sm:block absolute inset-x-0 bottom-0 p-2 md:p-2.5">
        <p className="text-[9px] md:text-[10.5px] xl:text-[11px] font-medium leading-[1.2] tracking-[-0.01em] text-white/90">
          {slot.category}
        </p>
        <p className="hidden md:block mt-0.5 font-mono text-[8.5px] tracking-[0.06em] text-white/40 group-hover:text-white/65 transition-colors truncate">
          {slot.videoUrl ? 'Playing reel' : 'Replace .mp4'}
        </p>
      </div>
    </button>
  );
}

export default function HeroContentOrbit() {
  const [slots, setSlots] = useState<HeroOrbitVideoSlot[]>(HERO_ORBIT_VIDEOS);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const openEditor = (index: number) => {
    setUrlInput(slots[index]?.videoUrl ?? '');
    setEditingIndex(index);
  };

  const handleVideoFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingIndex === null) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setSlots((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? { ...item, videoUrl: objectUrl } : item))
    );
    setEditingIndex(null);
  };

  const handleUrlSave = () => {
    if (editingIndex === null) return;
    setSlots((prev) =>
      prev.map((item, idx) =>
        idx === editingIndex ? { ...item, videoUrl: urlInput.trim() } : item
      )
    );
    setEditingIndex(null);
  };

  const handleClearVideo = () => {
    if (editingIndex === null) return;
    setSlots((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? { ...item, videoUrl: '' } : item))
    );
    setUrlInput('');
    setEditingIndex(null);
  };

  const editingSlot = editingIndex !== null ? slots[editingIndex] : null;

  return (
    <div className="relative w-full flex justify-center">
      {/* ALL BREAKPOINTS: Compact Circular Orbiting 9:16 Content Previews Around Stationary Wordmark */}
      <div className="hero-orbit-stage relative flex items-center justify-center mx-auto w-[280px] h-[280px] min-[375px]:w-[324px] min-[375px]:h-[324px] sm:w-[390px] sm:h-[390px] md:w-[460px] md:h-[460px] lg:w-[530px] lg:h-[530px] xl:w-[580px] xl:h-[580px] select-none">
        {/* Quiet concentric orbital hairlines — zero gradients, pure dark restraint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[9%] rounded-full border border-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[21%] rounded-full border border-white/[0.09]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[35%] rounded-full border border-white/[0.06]"
        />

        {/* Stationary Center Anchor — RIGHTMETHOD Wordmark */}
        <div className="pointer-events-none relative z-20 flex items-center justify-center rounded-full border border-white/12 bg-black/95 px-3.5 py-2 min-[375px]:px-4 min-[375px]:py-2.5 sm:px-5 sm:py-3.5 lg:px-7 lg:py-5 shadow-[0_0_50px_rgba(0,0,0,0.98)]">
          <RightMethodLogo
            variant="light-on-dark"
            className="h-3.5 min-[375px]:h-4 sm:h-6 lg:h-8 xl:h-9 w-auto"
          />
        </div>

        {/* Orbiting Ring (6 vertical 9:16 slots spaced cleanly at 60° intervals) */}
        <div
          className="hero-orbit-ring absolute inset-0 pointer-events-none"
          aria-label="Orbiting short-form content showcase around RIGHTMETHOD"
        >
          {slots.map((slot, idx) => {
            const angleDeg = idx * 60;
            const depthScaleClass =
              idx % 3 === 0 ? 'scale-[1.03]' : idx % 3 === 1 ? 'scale-[0.95]' : 'scale-[0.98]';

            return (
              <div
                key={slot.id}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translateY(calc(-1 * var(--orbit-r, 96px))) rotate(${-angleDeg}deg)`,
                }}
                className="pointer-events-auto absolute left-1/2 top-1/2 [--orbit-r:95px] min-[375px]:[--orbit-r:110px] sm:[--orbit-r:132px] md:[--orbit-r:156px] lg:[--orbit-r:178px] xl:[--orbit-r:194px]"
              >
                <div className={`hero-orbit-upright ${depthScaleClass}`}>
                  <div className="w-[44px] min-[375px]:w-[52px] sm:w-[66px] md:w-[82px] lg:w-[94px] xl:w-[104px]">
                    <OrbitVideoCard slot={slot} onSelect={() => openEditor(idx)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Replaceable Video Slot Modal (Local .mp4 / URL) */}
      {editingIndex !== null && editingSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="orbit-video-modal"
        >
          <div className="w-full max-w-md border border-white/15 bg-[#0a0a0a] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Slot {editingSlot.slotIndex} · 9:16 Short-Form
                </p>
                <h3 id="orbit-video-modal" className="mt-1 text-[16px] font-medium text-white">
                  {editingSlot.category}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingIndex(null)}
                aria-label="Close modal"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/20 bg-black p-6 text-center hover:border-white/50 transition-colors cursor-pointer">
                <Film className="h-5 w-5 text-white/60" />
                <span className="text-[13px] text-white/85">Upload vertical reel (.mp4 / .webm)</span>
                <span className="text-[11px] text-white/45">9:16 portrait video clip</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/*"
                  onChange={handleVideoFileUpload}
                  className="hidden"
                />
              </label>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-white/10" />
                <span className="mx-3 font-mono text-[10px] uppercase text-white/40">or paste .mp4 URL</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://.../reel.mp4"
                  className="flex-1 border border-white/15 bg-black px-3.5 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleUrlSave}
                  className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black hover:bg-white/85 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {editingSlot.videoUrl && (
                <button
                  type="button"
                  onClick={handleClearVideo}
                  className="w-full border border-white/10 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 hover:border-white/35 hover:text-white transition-colors cursor-pointer"
                >
                  Revert to studio frame
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
