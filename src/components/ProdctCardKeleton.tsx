import { motion, Variants,Easing } from 'motion/react';

const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["-200% 0%", "200% 0%"],
  },
};

const shimmerTransition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "linear" as Easing,
};
const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      style={{
        width: 270,
        padding: 20,
        borderRadius: 15,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        transition={shimmerTransition}
        style={{
          height: 180,
          borderRadius: 12,
          background:
            "linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)",
          backgroundSize: "400% 100%",
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        transition={shimmerTransition}
        style={{
          height: 20,
          width: "70%",
          borderRadius: 8,
          background:
            "linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)",
          backgroundSize: "400% 100%",
          marginTop: 10,
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        transition={shimmerTransition}
        style={{
          height: 20,
          width: "40%",
          borderRadius: 8,
          background:
            "linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)",
          backgroundSize: "400% 100%",
          marginTop: 6,
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        transition={shimmerTransition}
        style={{
          height: 40,
          width: "100%",
          borderRadius: 50,
          background:
            "linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)",
          backgroundSize: "400% 100%",
          marginTop: 20,
        }}
      />
    </motion.div>
  );
};

export default ProductCardSkeleton;