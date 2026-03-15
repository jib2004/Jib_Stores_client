import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type BidProp = {
  name: string;
  description: string;
  currentBid: number;
  yourBid: number;
  img: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function BidCard({
  name,
  description,
  currentBid,
  yourBid,
  img,
}: BidProp) {
  const [watched, setWatched] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const isWinning = yourBid > currentBid;

  return (
    <div className="w-[280px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-zinc-900">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {isWinning ?
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white text-black">
            Winning
          </span>
          :
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white text-black">
            Outbid
          </span>
        }
      </div>

      {/* Body */}
      <div className="px-[18px] pt-4 pb-[18px]">
        {/* Name + dropdown trigger */}
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <h2 className="text-[18px] font-serif text-white truncate leading-snug">
            {name}
          </h2>
          <motion.button
            onClick={() => setDescOpen((o) => !o)}
            animate={{ rotate: descOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mt-0.5 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors duration-150 cursor-pointer bg-transparent"
            aria-label="Toggle description"
          >
            <svg
              width="10"
              height="10"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.button>
        </div>

        {/* Animated description */}
        <AnimatePresence initial={false}>
          {descOpen && (
            <motion.div
              key="description"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: -6 }}
                animate={{ y: 0 }}
                exit={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="text-[13px] text-white/50 leading-relaxed mb-3.5 pr-1"
              >
                {description}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bid row */}
        <div className="flex justify-between bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-3 mb-3.5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Current Bid
            </span>
            <span className="text-[20px] font-semibold text-white/60 leading-none">
              {formatCurrency(currentBid)}
            </span>
          </div>

          <div className="w-px self-stretch bg-white/10 mx-1" />

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Your Bid
            </span>
            <span className="text-[20px] font-semibold text-white leading-none">
              {formatCurrency(yourBid)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 items-center">
          <button className="flex-1 py-3 rounded-xl bg-white text-black text-[14px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-150 cursor-pointer border-none">
            Raise Bid
          </button>

          <button
            onClick={() => setWatched((w) => !w)}
            title="Watch item"
            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
              watched
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/20 hover:border-white/40 hover:bg-white/5"
            }`}
          >
            <EyeIcon active={watched} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke={active ? "black" : "rgba(255,255,255,0.6)"}
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}