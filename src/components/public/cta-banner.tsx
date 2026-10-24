'use client';
import React from 'react';
import { Reveal } from '@/components/motion/reveal';

export default function CtaBanner() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-24">
      <Reveal className="container relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#1d1d1f] px-6 py-16 text-center text-white sm:rounded-[2.5rem] sm:px-12 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-[420px] w-[760px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(120,70,255,0.45),transparent)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-headline text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Ready for a website that brings in clients?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80 sm:text-xl">
            Tell us about your project and get a free quote within one business day.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full bg-white px-8 text-base font-medium text-[#1d1d1f] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get a free quote
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
