
import React, { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Hire Me", href: "#contact" },
];

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-5 sm:px-5">
      <motion.div
        initial={{ opacity: 0, y: -35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto w-fit max-w-full"
      >
        {/* Animated outer glow */}
        <motion.div
          animate={{
            opacity: [0.35, 0.8, 0.35],
            scale: [0.98, 1.03, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -inset-[2px] rounded-full bg-gradient-to-r from-cyan-400/60 via-blue-500/60 to-fuchsia-500/60 blur-md"
        />

        {/* Navbar glass container */}
        <div className="relative overflow-hidden rounded-full border border-white/15 bg-[#080b16]/80 p-1.5 shadow-[0_8px_40px_rgba(37,99,235,0.18)] backdrop-blur-2xl">
          {/* Moving light across navbar */}
          <motion.div
            animate={{ x: ["-150%", "250%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-y-0 w-16 skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <ul className="relative flex items-center justify-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => {
              const active = activeLink === link.href;

              return (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-2.5 text-[11px] font-medium transition-colors duration-300 sm:px-5 sm:text-sm ${
                      active
                        ? "text-white"
                        : "text-slate-400 hover:text-cyan-200"
                    }`}
                  >
                    {/* Animated active background */}
                    {active && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full border border-cyan-300/30 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20 shadow-[0_0_20px_rgba(59,130,246,0.18)]"
                      />
                    )}

                    {/* Text and active indicator */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]"
                        />
                      )}

                      {link.name}
                    </span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
