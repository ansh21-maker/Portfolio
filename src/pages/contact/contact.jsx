import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  CONFIG – edit these                                                       */
/* -------------------------------------------------------------------------- */

const CONTACT = {
  email: "anshulkuama819@example.com",
  phone: "+91 7817906785",
  location: "Uttar pradesh, India",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  instagram: "https://instagram.com/your-username",
};

// Optional: create a free form at https://formspree.io and paste the endpoint,
// e.g. "https://formspree.io/f/abcdwxyz". If left empty, the form opens the
// visitor's email app (mailto) instead.
const FORM_ENDPOINT = "";

const ease = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  Small inline icons                                                        */
/* -------------------------------------------------------------------------- */

const Icon = {
  mail: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.1v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.32h-4V9.75Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-10" />
    </svg>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Floating-label field                                                      */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  textarea = false,
  maxLength,
}) {
  const base =
    "peer w-full rounded-xl border bg-white/[0.04] px-4 pb-2.5 pt-6 text-sm text-white placeholder-transparent outline-none transition-all duration-200 focus:bg-white/[0.07]";
  const border = error
    ? "border-red-400/60 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.12)]"
    : "border-white/10 focus:border-sky-400/70 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]";

  const common = {
    id,
    name: id,
    value,
    onChange,
    onBlur,
    placeholder: " ",
    maxLength,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${base} ${border}`,
  };

  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea {...common} rows={5} className={`${common.className} resize-none`} />
        ) : (
          <input {...common} type={type} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[11px] text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-sky-300"
        >
          {label}
        </label>
        {textarea && maxLength && (
          <span className="pointer-events-none absolute bottom-3 right-4 text-[11px] text-gray-500">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact info row                                                          */
/* -------------------------------------------------------------------------- */

function InfoRow({ icon, label, value, href, copyable }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable – ignore */
    }
  };

  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sky-300 transition-colors duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-400/10">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-gray-500">{label}</span>
        <span className="block truncate text-sm font-medium text-gray-100">{value}</span>
      </span>
    </>
  );

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.03]">
      {href ? (
        <a href={href} className="flex min-w-0 flex-1 items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-xl">
          {inner}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-4">{inner}</div>
      )}
      {copyable && (
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs text-gray-300 transition-colors hover:border-sky-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          {copied ? Icon.check : Icon.copy}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

const initial = { name: "", email: "", subject: "", message: "" };

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Add a short subject.";
  if (v.message.trim().length < 10) e.message = "Write at least 10 characters.";
  return e;
};

export const Contact = () => {
  const reduce = useReducedMotion();

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [honey, setHoney] = useState("");

  // cursor glow that travels around the form card
  const gx = useMotionValue(-400);
  const gy = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}px ${gy}px, rgba(99,102,241,0.18), transparent 65%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${gx}px ${gy}px, rgba(56,189,248,0.55), transparent 70%)`;

  const onCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honey) return; // bot caught by hidden field

    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) return;

    // No endpoint configured → fall back to the visitor's email app
    if (!FORM_ENDPOINT) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        values.subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const socials = [
    { name: "GitHub", href: CONTACT.github, icon: Icon.github },
    { name: "LinkedIn", href: CONTACT.linkedin, icon: Icon.linkedin },
    { name: "Instagram", href: CONTACT.instagram, icon: Icon.instagram },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-black py-24 text-white sm:py-28"
    >
      {/* ---------------- Background ---------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={reduce ? {} : { x: [0, 50, -30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-sky-600/20 blur-[120px]"
        />
        <motion.div
          animate={reduce ? {} : { x: [0, -60, 30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-purple-600/20 blur-[130px]"
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        {/* ---------------- Heading ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              together
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Have a project, a question, or just want to say hi? Send a message
            and I'll get back to you as soon as I can.
          </p>
        </motion.div>

        {/* ---------------- Grid ---------------- */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
              <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-4 py-1.5 text-xs text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Usually replies within a day
              </div>

              <div className="space-y-1">
                <InfoRow
                  icon={Icon.mail}
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                  copyable
                />
                <InfoRow
                  icon={Icon.phone}
                  label="Phone"
                  value={CONTACT.phone}
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                />
                <InfoRow icon={Icon.pin} label="Location" value={CONTACT.location} />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium text-gray-500">Find me online</p>
              <div className="mt-4 flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    initial={{ opacity: 0, y: 16, scale: 0.85 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.45, ease }}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(56,189,248,0.35)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-gray-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            onMouseMove={onCardMove}
            className="relative rounded-3xl p-px"
          >
            {/* glowing edge that follows the cursor */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: edge }}
            />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />

            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-950/90 p-6 backdrop-blur-xl sm:p-8">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: glow }}
              />

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-purple-500 shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                          d="m5 12 5 5 9-10"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.35, duration: 0.5 }}
                        />
                      </svg>
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-bold">Message ready to go</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
                      Thanks, {values.name.split(" ")[0] || "friend"}. I'll reply to{" "}
                      <span className="text-gray-200">{values.email}</span> soon.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field
                        id="name"
                        label="Your name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                      />
                      <Field
                        id="email"
                        type="email"
                        label="Email address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />
                    </div>

                    <Field
                      id="subject"
                      label="Subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.subject && errors.subject}
                    />

                    <Field
                      id="message"
                      label="Your message"
                      textarea
                      maxLength={600}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message && errors.message}
                    />

                    {/* honeypot – hidden from people, filled by bots */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      aria-hidden="true"
                    />

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          role="alert"
                          className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                        >
                          The message didn't send. Check your connection and try
                          again, or email me directly at {CONTACT.email}.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.55)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative inline-flex h-13 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-7 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative flex items-center gap-2">
                        {status === "sending" ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                              ↗
                            </span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;