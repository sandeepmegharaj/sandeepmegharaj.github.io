/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn, getAssetPath } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";

const TECH_ICONS: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactNode> = {
  "React.js": (props) => <ReactLight {...props} />,
  "Next.js": (props) => <NextjsIconDark {...props} />,
  "Python": (props) => <Python {...props} />,
  "PostgreSQL": (props) => <Postgresql {...props} />,
  "Prisma": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 22.5L12 1.5 0 22.5h24zM12 5.5l8.5 15H3.5l8.5-15z" />
    </svg>
  ),
  "Streamlit": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.123 20.887a.465.465 0 0 1-.365.176h-13.5c-.144 0-.28-.065-.37-.176a.485.485 0 0 1-.065-.4l3-11a.485.485 0 0 1 .47-.37h1.03v-4.14a.485.485 0 0 1 .47-.47h3.03a.485.485 0 0 1 .47.47v4.14h1.03a.485.485 0 0 1 .47.37l3 11a.485.485 0 0 1-.065.4z" />
    </svg>
  ),
  "LangGraph": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="4" r="2.5" fill="currentColor" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <line x1="12" y1="6.5" x2="6.5" y2="15.5" />
      <line x1="12" y1="6.5" x2="17.5" y2="15.5" />
      <line x1="7.5" y1="18" x2="16.5" y2="18" strokeDasharray="2 2" stroke="currentColor" />
    </svg>
  ),
  "DeepAgents": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
      <path d="M12 14a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
  "Deep Agents": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
      <path d="M12 14a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
  "LangChain": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  "Tavily": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16" y2="16" />
      <path d="M11 8v6M8 11h6" strokeWidth="1.5" />
    </svg>
  ),
  "Gpt5": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 18.3a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.48 4.48 0 0 1 2.37-1.98v5.69a.77.77 0 0 0 .38.67l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.85-6.84-3.95 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.08 2.33zm2.01-3.02-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76a.8.8 0 0 0-.39.68zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5Z" />
    </svg>
  ),
  "Data Lab": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  "Azure AI": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.05 4.24 6.56 18.01H2l8.83-15.65h2.22zm1.61 5.09-2.31 4.9 3.86 5.56H7.95l1.65-3.5h5.45l-2.58-3.71 4.56-9.76h2.22l-4.64 6.51z" />
    </svg>
  ),
  "Working Screenshot": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  "Claude Code": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
    </svg>
  ),
};


function ProjectImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className={cn("w-full h-48 bg-muted", className)} />;
  }

  return (
    <img
      src={getAssetPath(src)}
      alt={alt}
      className={cn("w-full h-48 object-cover bg-neutral-950", className)}
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  imageClassName?: string;
  video?: string;
  logo?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  imageClassName,
  video,
  logo,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <div className="relative shrink-0 border-b border-border/40">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className={cn("w-full h-48 object-cover", imageClassName)}
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} className={imageClassName} />
          ) : (
            <div className={cn("w-full h-48 bg-muted", imageClassName)} />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {logo && (
              <img
                src={getAssetPath(logo)}
                alt={`${title} logo`}
                className="size-7 rounded-lg object-contain border border-border/80 shrink-0 bg-neutral-950 p-0.5 shadow-sm"
              />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight">{title}</h3>
              <time className="text-xs text-muted-foreground">{dates}</time>
            </div>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm shrink-0"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        {description ? (
          <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        ) : null}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => {
              const Icon = TECH_ICONS[tag];
              return (
                <Badge
                  key={tag}
                  className="flex items-center gap-1 text-[11px] font-medium border border-border h-6 w-fit px-2 select-none"
                  variant="outline"
                >
                  {Icon && <Icon className="size-3.5 fill-current" />}
                  <span>{tag}</span>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
