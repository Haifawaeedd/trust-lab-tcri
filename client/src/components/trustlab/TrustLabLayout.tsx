/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  The layout should feel like a bilingual research dossier with disciplined asymmetry,
  calm authority, and visible structural hierarchy. Avoid generic app-shell patterns.
  Does this choice reinforce or dilute our design philosophy?
*/

import { type ReactNode, useEffect } from "react";
import { Link } from "wouter";
import {
  appMeta,
  footerContent,
  navigation,
  type Language,
} from "@/content/trustlabContent";

type LayoutProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  currentPath: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  aside?: ReactNode;
  children: ReactNode;
};

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  text?: string;
  align?: "start" | "end";
};

type PanelProps = {
  children: ReactNode;
  className?: string;
};

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  tone?: "light" | "dark";
};

type MetricBadgeProps = {
  label: string;
  value: string;
  tone?: "neutral" | "safe" | "verify" | "high" | "critical";
};

const navItems = [
  { href: "/", key: "project" as const },
  { href: "/methodology", key: "methodology" as const },
  { href: "/demo", key: "demo" as const },
];

const toneClasses: Record<NonNullable<MetricBadgeProps["tone"]>, string> = {
  neutral:
    "border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[color:var(--ink-strong)]",
  safe: "border-emerald-600/35 bg-emerald-500/12 text-emerald-900",
  verify: "border-amber-600/35 bg-amber-500/12 text-amber-900",
  high: "border-orange-700/35 bg-orange-500/12 text-orange-900",
  critical: "border-rose-700/35 bg-rose-500/12 text-rose-900",
};

function isActiveRoute(currentPath: string, href: string) {
  return currentPath === href;
}

export function TrustLabLayout({
  language,
  onLanguageChange,
  currentPath,
  eyebrow,
  title,
  intro,
  aside,
  children,
}: LayoutProps) {
  const copy = navigation[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_top,rgba(121,163,164,0.22),transparent_62%)]" />
        <div className="absolute left-[-8rem] top-[18rem] h-72 w-72 rounded-full bg-[rgba(214,188,132,0.14)] blur-3xl" />
        <div className="absolute right-[-4rem] top-[10rem] h-80 w-80 rounded-full bg-[rgba(91,122,132,0.16)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.82)] px-5 py-4 shadow-[0_18px_40px_rgba(34,44,54,0.08)] backdrop-blur-md sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] px-3 py-1 font-medium text-[color:var(--ink-strong)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                  {copy.githubFirst}
                </span>
                <span>{appMeta.repoName}</span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.8fr)] lg:items-start">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <h1 className="text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[color:var(--ink-strong)]">
                      {title ?? appMeta.title}
                    </h1>
                    {eyebrow ? (
                      <p className="max-w-3xl text-[0.82rem] uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                        {eyebrow}
                      </p>
                    ) : null}
                  </div>
                  {intro ? (
                    <p className="max-w-3xl text-base leading-8 text-[color:var(--ink-body)] sm:text-lg">
                      {intro}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-3 rounded-[1.6rem] border border-[color:var(--line-soft)] bg-[rgba(248,245,238,0.85)] p-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.74rem] font-medium uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                      {copy.languageLabel}
                    </span>
                    <div className="inline-flex rounded-full border border-[color:var(--line-strong)] bg-white/70 p-1">
                      <button
                        type="button"
                        onClick={() => onLanguageChange("en")}
                        aria-pressed={language === "en"}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                          language === "en"
                            ? "bg-[color:var(--ink-strong)] text-white"
                            : "text-[color:var(--ink-muted)] hover:text-[color:var(--ink-strong)]"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        onClick={() => onLanguageChange("ar")}
                        aria-pressed={language === "ar"}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                          language === "ar"
                            ? "bg-[color:var(--ink-strong)] text-white"
                            : "text-[color:var(--ink-muted)] hover:text-[color:var(--ink-strong)]"
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>
                  <p className="leading-7 text-[color:var(--ink-body)]">
                    {footerContent[language].line}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[color:var(--line-soft)] pt-4 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const active = isActiveRoute(currentPath, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[color:var(--ink-strong)] shadow-[0_8px_20px_rgba(34,44,54,0.08)]"
                        : "border-transparent text-[color:var(--ink-muted)] hover:border-[color:var(--line-soft)] hover:bg-white/70 hover:text-[color:var(--ink-strong)]"
                    }`}
                  >
                    {copy[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-[0.74rem] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              <span className="rounded-full border border-dashed border-[color:var(--line-strong)] px-3 py-1">
                TCRI / DSR
              </span>
              <span className="rounded-full border border-dashed border-[color:var(--line-strong)] px-3 py-1">
                Bilingual AR / EN
              </span>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
          <div className="space-y-8">{children}</div>
          <aside className="space-y-6 lg:sticky lg:top-6">{aside}</aside>
        </main>

        <footer className="mt-10 border-t border-[color:var(--line-soft)] px-2 pt-5 text-sm text-[color:var(--ink-muted)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl leading-7">{footerContent[language].line}</p>
            <p className="text-[0.76rem] uppercase tracking-[0.2em]">{appMeta.repoName}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function TrustLabSectionHeading({
  kicker,
  title,
  text,
  align = "start",
}: SectionHeadingProps) {
  const alignment = align === "end" ? "lg:ml-auto lg:max-w-2xl" : "max-w-3xl";

  return (
    <div className={`space-y-3 ${alignment}`}>
      {kicker ? (
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--ink-muted)]">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.7rem,2vw,2.7rem)] font-semibold leading-tight tracking-[-0.04em] text-[color:var(--ink-strong)]">
        {title}
      </h2>
      {text ? <p className="text-base leading-8 text-[color:var(--ink-body)]">{text}</p> : null}
    </div>
  );
}

export function TrustLabPanel({ children, className = "" }: PanelProps) {
  return (
    <div
      className={`rounded-[1.8rem] border border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.9)] p-5 shadow-[0_22px_50px_rgba(34,44,54,0.08)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function TrustLabFigure({
  src,
  alt,
  caption,
  tone = "light",
}: FigureProps) {
  const figureTone =
    tone === "dark"
      ? "border-[rgba(30,38,46,0.14)] bg-[rgba(30,38,46,0.92)] text-white"
      : "border-[color:var(--line-soft)] bg-[rgba(255,252,246,0.9)] text-[color:var(--ink-strong)]";

  return (
    <figure className={`overflow-hidden rounded-[2rem] border shadow-[0_24px_60px_rgba(34,44,54,0.1)] ${figureTone}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {caption ? (
        <figcaption className="border-t border-current/10 px-5 py-4 text-sm leading-7 text-current/72">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function TrustLabMetricBadge({
  label,
  value,
  tone = "neutral",
}: MetricBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ${toneClasses[tone]}`}
    >
      <span className="text-[0.72rem] uppercase tracking-[0.2em]">{label}</span>
      <span className="text-sm font-semibold tracking-[-0.02em]">{value}</span>
    </div>
  );
}
