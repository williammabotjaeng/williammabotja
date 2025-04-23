"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Experience = () => {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push("/experience"); // Ensure you have an /experience page.
  };

  return (
    <div
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6"
    >
      {/* Header & Overview */}
      <motion.div
        className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-4xl font-bold">Experience</h2>
          <p className="mt-2 text-lg">
            I've collaborated with 10 companies and held 10 diverse roles over 9+ years of experience.
          </p>
        </div>
        <button
          onClick={handleSeeMore}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors duration-300"
        >
          See More
        </button>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="text-5xl font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            10
          </motion.div>
          <p className="mt-2">Companies</p>
        </div>
        <div className="flex flex-col items-center">
          <motion.div
            className="text-5xl font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            10
          </motion.div>
          <p className="mt-2">Positions</p>
        </div>
        <div className="flex flex-col items-center">
          <motion.div
            className="text-5xl font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            9+
          </motion.div>
          <p className="mt-2">Years Experience</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
