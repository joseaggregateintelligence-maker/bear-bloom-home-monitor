import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | undefined;
  href?: string | undefined;
  className?: string | undefined;
  onClick?: () => void | undefined;
  arrow?: boolean | undefined;
};

export function Button({ children, variant = "primary", href, className, onClick, arrow = true }: ButtonProps) {
  const label = (
    <span className="flex items-center gap-2">
      {children}
      {arrow && <span aria-hidden>→</span>}
    </span>
  );
  const cls = cn(
    "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-[15px] font-[550] tracking-[-0.01em] transition-colors duration-500 ease-premium",
    variant === "primary" ? "bg-cocoa text-cream" : "hairline bg-transparent text-cocoa",
    className,
  );
  const inner = (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-[450ms] ease-premium group-hover:-translate-y-full motion-reduce:group-hover:translate-y-0">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-[450ms] ease-premium group-hover:translate-y-0 motion-reduce:hidden"
      >
        {label}
      </span>
    </span>
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

export function Eyebrow({ children, number, className }: { children: ReactNode; number?: string | undefined; className?: string }) {
  return (
    <p className={cn("font-mono uppercase tracking-[0.08em] text-muted-warm", className)} style={{ fontSize: 12 }}>
      {number && <span>{number} · </span>}
      {children}
    </p>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
  stagger?: number | undefined;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const items = stagger && Array.isArray(children) ? children : null;
  if (items) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ show: { transition: { staggerChildren: stagger ?? 0, delayChildren: delay } } }}
      >
        {items.map((c, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {c}
          </motion.div>
        ))}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  number,
  heading,
  lead,
  className,
  align = "left",
}: {
  eyebrow?: string | undefined;
  number?: string | undefined;
  heading: ReactNode;
  lead?: ReactNode | undefined;
  className?: string | undefined;
  align?: "left" | "center" | undefined;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow number={number}>{eyebrow}</Eyebrow>}
      <h2 className="text-section mt-5 text-ink">{heading}</h2>
      {lead && <p className="text-lead mt-6 text-muted-warm">{lead}</p>}
    </Reveal>
  );
}
