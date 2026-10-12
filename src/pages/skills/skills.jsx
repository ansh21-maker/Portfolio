import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

import Html from "../../assets/text.png";
  import ReactPng from "../../assets/react.svg";
  import Js from "../../assets/js.png";
  import Css from "../../assets/css-3.png";
  import NodeJs from "../../assets/nodejs.png";
  import MongoDb from "../../assets/database.png"

const skills = [
  { name: "HTML", level: 90, category: "Frontend", color: "#F97316",logo:Html },
  { name: "CSS", level: 80, category: "Frontend", color: "#38BDF8",logo:Css },
  { name: "JavaScript", level: 70, category: "Language", color: "#FACC15",logo:Js },
  { name: "React", level: 75, category: "Frontend", color: "#22D3EE",logo:ReactPng },
  { name: "Node.js", level: 65, category: "Backend", color: "#4ADE80",logo:NodeJs},
  { name: "MongoDB", level: 60, category: "Database", color: "#34D399",logo:MongoDb },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Counter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", setDisplay);

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, value]);

  return <>{display}%</>;
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative rounded-2xl border border-white/10
                 bg-white/[0.04] p-5 backdrop-blur-xl
                 transition-colors duration-300
                 hover:border-white/25 hover:bg-white/[0.07]"
    >
      {/* Soft glow */}
      <div
        className="pointer-events-none absolute -right-1 -top-1
                   h-20 w-20 rounded-full opacity-10 blur-2xl
                   transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: skill.color }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center
                         rounded-xl border border-white/10 text-lg font-bold"
              style={{
                color: skill.color,
                backgroundColor: `${skill.color}15`,
              }}
            >
              
<div
  className="flex h-11 w-11 shrink-0 items-center justify-center
             rounded-xl border border-white/10"
  style={{
    backgroundColor: `${skill.color}15`,
  }}
>
  <img
    src={skill.logo}
    alt={`${skill.name} logo`}
    className="h-7 w-7 object-contain transition-transform duration-300
               group-hover:scale-110"
  />
</div>

            </div>

            <div>
              <h3 className="font-semibold text-white">{skill.name}</h3>
              <p className="text-xs text-gray-500">{skill.category}</p>
            </div>
          </div>

          <p className="text-lg font-bold" style={{ color: skill.color }}>
            <Counter value={skill.level} />
          </p>
        </div>

        {/* Progress track */}
        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1.4,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
              boxShadow: `0 0 14px ${skill.color}55`,
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "250%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.5 + index * 0.12,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </motion.div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>Proficiency</span>
          <span>{skill.level >= 80 ? "Strong" : skill.level >= 70 ? "Intermediate" : "Learning"}</span>
        </div>
      </div>
    </motion.div>
  );
}

export const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden bg-black py-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-sky-400">
            My Technical Skills
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Technologies I <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">Learn</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Technologies I use to build modern, responsive, and
            user-friendly web applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-gray-600"
        >
          Always learning. Always building.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;