import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { ImagePlus, X } from 'lucide-react';
import { CLIENT_PANORAMA_PHOTOS, PanoramaPhoto } from '../data/rightmethodData';

export default function ClientPanorama3D() {
  const prefersReducedMotion = useReducedMotion();
  const [photos, setPhotos] = useState<PanoramaPhoto[]>(CLIENT_PANORAMA_PHOTOS);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const hoveredRef = useRef(false);
  const didDragRef = useRef(false);

  const [radius, setRadius] = useState(560);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(300);
      else if (w < 1024) setRadius(430);
      else setRadius(570);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Continuous smooth 60fps cylinder rotation + drag inertia
  useEffect(() => {
    if (prefersReducedMotion) return;
    let frameId: number;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (!isDragging) {
        setRotationY((prev) => {
          const baseSpeed = hoveredRef.current ? -2.2 : -6.5;
          let next = prev + baseSpeed * dt;
          if (Math.abs(velocityRef.current) > 0.05) {
            next += velocityRef.current * dt * 60;
            velocityRef.current *= 0.94;
          } else {
            velocityRef.current = 0;
          }
          return next;
        });
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, prefersReducedMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    didDragRef.current = false;
    dragStartX.current = e.clientX;
    dragStartRot.current = rotationY;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) {
      didDragRef.current = true;
    }
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    velocityRef.current = ((e.clientX - lastXRef.current) / dt) * 2.2;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    setRotationY(dragStartRot.current + dx * 0.22);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if already released
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingIndex === null) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotos((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? { ...item, imageUrl: objectUrl } : item))
    );
    setEditingIndex(null);
  };

  const handleUrlSave = () => {
    if (editingIndex === null) return;
    setPhotos((prev) =>
      prev.map((item, idx) =>
        idx === editingIndex ? { ...item, imageUrl: urlInput.trim() } : item
      )
    );
    setEditingIndex(null);
  };

  const count = photos.length;
  const angleStep = 360 / count;

  return (
    <div className="relative">
      {/* 3D Curved Cylindrical Panorama Stage — Full Unclipped Arc */}
      <div
        role="region"
        aria-label="Client photography 3D curved panorama. Drag horizontally to spin."
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative h-[290px] sm:h-[360px] lg:h-[450px] w-full overflow-hidden select-none touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          perspective: '1800px',
          perspectiveOrigin: '50% 34%',
        }}
      >
        {/* Subtle left/right vignette fading cleanly into pure black */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-36 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-36 bg-gradient-to-l from-black to-transparent"
        />

        {/* 3D Tilted Ring Anchor */}
        <div
          className="absolute left-1/2 top-[40%]"
          style={{
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-7deg)',
          }}
        >
          {/* Rotating Cylinder */}
          <div
            style={{
              position: 'relative',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationY}deg)`,
            }}
          >
            {photos.map((photo, index) => {
              const cardAngle = index * angleStep;
              const effectiveRad = ((cardAngle + rotationY) * Math.PI) / 180;
              const facing = Math.cos(effectiveRad);
              const opacity = facing > 0 ? 0.45 + facing * 0.55 : 0.16 + (facing + 1) * 0.24;

              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    if (!didDragRef.current) {
                      setUrlInput(photo.imageUrl);
                      setEditingIndex(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: radius < 400 ? '156px' : radius < 500 ? '204px' : '248px',
                    height: radius < 400 ? '104px' : radius < 500 ? '136px' : '164px',
                    marginLeft: radius < 400 ? '-78px' : radius < 500 ? '-102px' : '-124px',
                    marginTop: radius < 400 ? '-52px' : radius < 500 ? '-68px' : '-82px',
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    opacity,
                    backfaceVisibility: 'visible',
                  }}
                  className="group rounded-xl overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-[border-color] duration-200 hover:border-white/50 cursor-pointer"
                >
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.alt}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="relative h-full w-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.09),#090909_75%)] flex items-center justify-center">
                      <svg
                        viewBox="0 0 120 80"
                        className="h-14 w-20 text-white/15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        aria-hidden="true"
                      >
                        <circle cx="60" cy="30" r="11" />
                        <path d="M36 68c4-12 13-18 24-18s20 6 24 18" />
                      </svg>
                      <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-white/75 opacity-0 group-hover:opacity-100 transition-opacity">
                        + Photo {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Minimal Photo Uploader / URL Modal */}
      {editingIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pano-photo-modal"
        >
          <div className="w-full max-w-md border border-white/15 bg-[#0b0b0b] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 id="pano-photo-modal" className="text-[16px] font-medium text-white">
                Add Client Photo · Frame {String(editingIndex + 1).padStart(2, '0')}
              </h3>
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
                <ImagePlus className="h-5 w-5 text-white/60" />
                <span className="text-[13px] text-white/80">Upload photo from device</span>
                <span className="text-[11px] text-white/45">JPG, PNG, or WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-white/10" />
                <span className="mx-3 font-mono text-[10px] uppercase text-white/40">or paste URL</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 border border-white/15 bg-black px-3.5 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-[#2c86f6] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleUrlSave}
                  className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black hover:bg-[#2c86f6] hover:text-white transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
