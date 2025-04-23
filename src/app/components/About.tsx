"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StardustImageSlider from "@/components/StardustImageSlider";

const About = () => {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push("/about");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-transparent text-white p-4">
      {/* Left Side: Image Slider */}
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <StardustImageSlider />
        </motion.div>
      </div>

      {/* Right Side: Text and Button */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center md:pl-16 mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-lg">
            I'm a self taught fullstack developer and Microsoft certified. I am also Python certified through PCEP.
            I am also ranked 7th all time on sololearn.com in South Africa and I've won a hackathon on devpost.com.
          </p>
          <button
            onClick={handleSeeMore}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-300"
          >
            See More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
