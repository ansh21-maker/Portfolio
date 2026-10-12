import React from "react";
import { motion } from "framer-motion";

import Photoshop from "../../assets/photoshop.png";
import Coding from "../../assets/web-programming.png";
import Ui from "../../assets/ui-ux.png";

const aboutData = [
  {
    title: "Coding",
    image: Coding,
    number: "01",
    color: "#38BDF8",
    description:
      "I enjoy coding and building modern web applications that are fast, responsive, and easy to use. I work with JavaScript, React, Node.js, Express, and MongoDB to turn ideas into functional digital experiences.",
    tags: ["React", "JavaScript", "Node.js"],
  },
  {
    title: "Photo Editing",
    image: Photoshop,
    number: "02",
    color: "#A78BFA",
    description:
      "I enjoy improving images, experimenting with creative styles, colors, and effects, and creating visuals that look clean, attractive, and engaging.",
    tags: ["Creative", "Visuals", "Editing"],
  },
  {
    title: "UI/UX Design",
    image: Ui,
    number: "03",
    color: "#2DD4BF",
    description:
      "I enjoy designing clean and user-friendly interfaces. I experiment with layouts, colors, typography, spacing, and animations to create attractive and easy-to-navigate experiences.",
    tags: ["UI Design", "UX", "Prototyping"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const AboutCard = ({ item }) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative h-full rounded-2xl p-px overflow-hidden"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${item.color}, transparent 45%, #8B5CF6)`,
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card content */}
      <div className="relative flex h-full flex-col rounded-2xl bg-[#09090B] p-6 sm:p-7">
        {/* Number and icon */}
        <div className="mb-7 flex items-center justify-between">
          <span className="text-sm tracking-[0.25em] text-white/30">
            / {item.number}
          </span>

          <motion.div
            whileHover={{
              rotate: [0, -10, 10, 0],
              scale: 1.15,
            }}
            transition={{ duration: 0.45 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
            style={{
              backgroundColor: `${item.color}12`,
              boxShadow: `0 0 25px ${item.color}15`,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-8 w-8 object-contain"
            />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-sky-300">
          {item.title}
        </h2>

        {/* Description */}
        <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
          {item.description}
        </p>

        {/* Technology tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Animated bottom line */}
        <div className="mt-7 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
            className="h-full"
            style={{
              background: `linear-gradient(90deg, ${item.color}, #8B5CF6)`,
            }}
          />
        </div>

        {/* Bottom label */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            What I do
          </span>

          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-lg"
            style={{ color: item.color }}
          >
            ↗
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
};

export const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-sky-500/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-500/[0.08] blur-[110px]" />

      <div className="container relative mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
            About My Work
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What I{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Do
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            A combination of development and creativity to build
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* Animated cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {aboutData.map((item) => (
            <AboutCard key={item.number} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;