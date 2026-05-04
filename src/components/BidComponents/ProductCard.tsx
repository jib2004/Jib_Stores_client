import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductProp } from "../../types";
import { IoMdClose } from "react-icons/io";

const formatCurrency = (value: string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value));

export default function ProductCard({
  currentPrice,
  description,
  endTime,
  image,
  name,
  startTime,
  startingPrice,
  userName,
  reference,
  userId
}: ProductProp) {
  const [descOpen, setDescOpen] = useState<boolean>(false);
  const [openForm,setOpenForm] = useState<boolean>(false)
  const [amt,setAmt] = useState<string>('0')

  const placeBid = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    
  }

  return (
    <div className="w-[400px] relative rounded-2xl overflow-hidden bg-black border z-0 border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <h2 className="text-[20px] font-serif text-white leading-snug drop-shadow">
            {name.length > 90? `${name.slice(0,90)}...`  : name.slice(0,90) }
          </h2>
          <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80">
            Live
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-5 space-y-4">

        {/* Description dropdown */}
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setDescOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors duration-150 cursor-pointer bg-transparent border-none"
          >
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white/40">
              Description
            </span>
            <motion.span
              animate={{ rotate: descOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center justify-center"
            >
              <svg
                width="10"
                height="10"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {descOpen && (
              <motion.div
                key="desc"
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
                  className="px-4 pb-4 text-[13px] text-white/50 leading-relaxed border-t border-white/10 pt-3"
                >
                  {description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Starting Price
            </span>
            <span className="text-[22px] font-semibold text-white/50 leading-none">
              {formatCurrency(startingPrice)}
            </span>
          </div>
          <div className="bg-white/[0.07] border border-white/20 rounded-xl px-4 py-3 flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Current Price
            </span>
            <span className="text-[22px] font-semibold text-white leading-none">
              {formatCurrency(currentPrice)}
            </span>
          </div>
        </div>

        {/* Time row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
              Start
            </span>
            <span className="text-[12px] text-white/60 font-light">
              {startTime}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
              Ends
            </span>
            <span className="text-[12px] text-white/60 font-light">
              {endTime}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* User ID + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="text-[11px] text-white/30 font-mono tracking-tight">
              {/* {userName?.slice(0, 8)}…{userName?.slice(-4)} */}
              {userName}
            </span>
          </div>

          <button disabled={openForm} onClick={()=> setOpenForm(!openForm)} className="px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-150 cursor-pointer border-none">
            Place Bid
          </button>
        </div>
      </div>

      <motion.form 
      onSubmit={placeBid}
      animate={openForm ? {
        top:'50%',
        left:'50%',
        translateX:'-50%',
        translateY:'-50%',
        opacity:1,
      }: {
        opacity:0
      }}
      
      className="absolute flex flex-col justify-center gap-5 px-5 py-2 z-20 bg-white border shadow-md rounded-md  w-[300px] h-[200px]">
        <div className="flex justify-end">
          <IoMdClose onClick={()=> setOpenForm(!openForm)} size={20} className=" cursor-pointer"/>
        </div>
      <div className="flex flex-col">
        <label htmlFor="amt" className="text-black font-semibold">Amount:  </label>
      <input value={amt} onChange={(e)=> setAmt(e.target.value)}  type="number" name="amt" id="amt" className="border py-2 px-4 rounded-xl" />
      </div>

      <div>
        <button className="border bg-black text-white" type="submit">
          Place Bid
        </button>
      </div>
      

      
      </motion.form>
    </div>
  );
}
