import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Pencil, X } from 'lucide-react';
import { CLIENT_SHOWCASE, ClientProfile } from '../data/rightmethodData';

export default function RightOnesSection() {
  const [clients, setClients] = useState<ClientProfile[]>(CLIENT_SHOWCASE);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);
  const [paused, setPaused] = useState(false);

  const trackClients = [...clients, ...clients];

  const handleSaveClient = (updated: ClientProfile) => {
    setClients((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setEditingClient(null);
  };

  return (
    <section
      id="the-right-ones"
      className="relative border-t border-white/10 bg-transparent py-10 sm:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              02 · We Work With The Right Ones
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[22ch]">
              Not everyone needs a personal brand. The{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                right people need the right one.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/80 max-w-[54ch]">
              We don’t chase volume. We partner with exceptional individuals whose knowledge,
              stories and perspectives deserve to reach the right audience.
            </p>
          </div>
        </div>
      </div>

      {/* Continuous Left-to-Right Square Photo Showcase — Zero Text Beneath */}
      <div
        className="relative mt-7 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-black to-transparent"
        />

        <div
          className="flex w-max items-center animate-marquee-right"
          style={{ animationPlayState: paused || activeId ? 'paused' : 'running' }}
        >
          {trackClients.map((client, idx) => {
            const cardKey = `${client.id}-${idx}`;
            const isOpen = activeId === cardKey;

            return (
              <div
                key={cardKey}
                onClick={() => setActiveId(isOpen ? null : cardKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(isOpen ? null : cardKey);
                  }
                }}
                aria-label={`View growth details for ${client.fullName}`}
                className="group relative mx-3 sm:mx-3.5 h-48 w-48 sm:h-56 sm:w-56 shrink-0 rounded-2xl overflow-hidden border border-white/15 bg-[#0a0a0a] cursor-pointer transition-colors duration-200 hover:border-white/50 focus:outline-none"
              >
                {client.portraitUrl ? (
                  <img
                    src={client.portraitUrl}
                    alt={client.fullName}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.08),#080808_70%)]">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-14 w-14 text-white/20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden="true"
                    >
                      <circle cx="32" cy="23" r="10" />
                      <path d="M14 54c2.5-10 10-15 18-15s15.5 5 18 15" />
                    </svg>
                    <span className="mt-2 font-mono text-[11px] text-white/35">
                      {client.initials}
                    </span>
                  </div>
                )}

                {/* Crisp White Label Overlay on Click/Tap */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-3 bottom-3 rounded-xl bg-white p-4 text-left text-black shadow-[0_14px_36px_rgba(0,0,0,0.65)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[14px] font-semibold leading-tight text-black">
                            {client.fullName}
                          </p>
                          <p className="mt-0.5 text-[12px] text-black/65">{client.company}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingClient(client);
                          }}
                          aria-label={`Edit ${client.fullName}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-black/60 hover:border-black hover:text-black cursor-pointer shrink-0"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="mt-2.5 border-t border-black/10 pt-2">
                        <p className="font-mono text-[11px] font-medium text-[#1b5ec2]">
                          {client.growthMetric}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3.5 text-center text-[11px] text-white/40">
        Tap any photo to reveal client growth details
      </p>

      {/* Clean Editable Client Slot Modal */}
      {editingClient && (
        <ClientEditorModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onSave={handleSaveClient}
        />
      )}
    </section>
  );
}

function ClientEditorModal({
  client,
  onClose,
  onSave,
}: {
  client: ClientProfile;
  onClose: () => void;
  onSave: (updated: ClientProfile) => void;
}) {
  const [form, setForm] = useState<ClientProfile>(client);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-editor-title"
    >
      <div className="w-full max-w-md border border-white/15 bg-[#0b0b0b] p-6 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 id="client-editor-title" className="text-[17px] font-medium text-white">
            Edit Client Photo &amp; Growth Label
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="mt-5 space-y-4"
        >
          <div>
            <label className="block text-[12px] text-white/60 mb-1.5">Name</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[14px] text-white focus:border-[#2c86f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] text-white/60 mb-1.5">Company</label>
            <input
              type="text"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[14px] text-white focus:border-[#2c86f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] text-white/60 mb-1.5">Growth Numbers</label>
            <input
              type="text"
              required
              value={form.growthMetric}
              onChange={(e) => setForm({ ...form, growthMetric: e.target.value })}
              className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[14px] text-white focus:border-[#2c86f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] text-white/60 mb-1.5">Photograph URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.portraitUrl}
              onChange={(e) => setForm({ ...form, portraitUrl: e.target.value })}
              className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:border-[#2c86f6] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/75 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[40px] rounded-full bg-white px-5 py-2 text-[13px] font-medium text-black hover:bg-[#2c86f6] hover:text-white transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
