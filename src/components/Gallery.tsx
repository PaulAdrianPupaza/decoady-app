"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

export default function Gallery({ photos, alt, t }: { photos: string[]; alt: string; t: Dictionary["common"] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  // Gestos táctiles: deslizar para cambiar de foto
  const touchX = useRef<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((src, i) => (
          <li key={src} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-sand-200"
              aria-label={`${t.enlarge} ${i + 1} ${t.of} ${photos.length}`}
            >
              <Image
                src={src}
                alt={`${alt} — ${t.photo} ${i + 1}`}
                fill
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink-900/0 opacity-0 transition group-hover:bg-ink-900/25 group-hover:opacity-100">
                <Icon name="expand" className="h-8 w-8 text-white" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex flex-col bg-ink-900/95"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-sand-300 md:px-8">
            <span>
              {index + 1} / {photos.length}
            </span>
            <button ref={closeRef} type="button" onClick={close} className="grid h-11 w-11 place-items-center text-white" aria-label={t.close}>
              <Icon name="close" className="h-7 w-7" />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image
              key={photos[index]}
              src={photos[index]}
              alt={`${alt} — ${t.photo} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain p-2 md:p-8"
              priority
            />
          </div>
          {photos.length > 1 && (
            <div className="flex justify-center gap-3 pb-6 pt-3">
              <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10" aria-label={t.prev}>
                <Icon name="chevronLeft" className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10" aria-label={t.next}>
                <Icon name="chevronRight" className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
