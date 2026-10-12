
import React from "react";
import { motion } from "framer-motion";

import Oproject from "../../assets/Evenement Y3_octobre 2025.jpg";
import Bproject2 from "../../assets/AR_VR Gaming Website UI_UX Design — Modern & Responsive.jpg";
import Mproject3 from "../../assets/Your Standout Portfolio-Zero Code Needed.jpg";

const projects = [
  {
    title: "Event Management",
    category: "Web Design",
    description:
      "A modern event website concept with an engaging visual layout and elegant design.",
    image: Oproject,
    number: "01",
    color: "from-sky-500/20 to-blue-500/5",
    tags: ["UI/UX", "Responsive"],
  },
  {
    title: "AR/VR Gaming",
    category: "Gaming UI",
    description:
      "An immersive gaming interface concept featuring futuristic visuals and modern styling.",
    image: Bproject2,
    number: "02",
    color: "from-purple-500/20 to-fuchsia-500/5",
    tags: ["UI/UX", "Gaming"],
  },
  {
    title: "Developer Portfolio",
    category: "Portfolio Design",
    description:
      "A creative portfolio concept designed to showcase projects, skills, and personal branding.",
    image: Mproject3,
    number: "03",
    color: "from-cyan-500/20 to-purple-500/5",
    tags: ["Portfolio", "Web Design"],
  },
];

const ease = [0.22, 1, 0.36, 1];

export const Project = () => {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-purple-600/15 blur-[130px]" />

      <div className="container mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full border border-sky-400/30 bg-sky-400/5 px-4 py-2 text-xs tracking-[0.22em] text-sky-300 sm:text-sm">
            MY CREATIVE WORK
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A collection of designs and ideas that reflect my creativity,
            passion for web development, and attention to detail.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
                ease,
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-lg shadow-black/20 transition-colors duration-500 hover:border-sky-400/30 hover:bg-white/[0.06]"
            >
              {/* Image */}
              <div
                className={`relative h-56 overflow-hidden rounded-xl bg-gradient-to-br sm:h-60 ${project.color}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Project number */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                  PROJECT {project.number}
                </span>

                {/* Hover arrow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl backdrop-blur-lg"
                >
                  ↗
                </motion.div>
              </div>

              {/* Card details */}
              <div className="px-3 pb-4 pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
                  {project.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold transition-colors duration-300 group-hover:text-sky-300">
                  {project.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="mt-5 h-px w-full bg-white/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + index * 0.15,
                      ease,
                    }}
                    className="h-full bg-gradient-to-r from-sky-400 to-purple-500 opacity-70"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-gray-400">
            Have an idea for a project?
          </p>

          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/5 px-6 py-3 text-sm font-medium text-sky-300 transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-white"
          >
            Let's Work Together <span>↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
