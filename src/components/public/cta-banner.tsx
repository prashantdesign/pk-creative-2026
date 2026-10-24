'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import Magnetic from '@/components/motion/magnetic';

export default function CtaBanner() {
  return (
    <section className="px-4 py-12 sm:px-6 md:py-20">
      <Reveal className="container relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4b1fd1] via-primary to-[#8b5cf6] px-6 py-14 text-center text-white sm:px-12 md:py-20">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-25" />
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 animate-float rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.36),transparent)]  " />
        <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 animate-float-sm rounded-full bg-[radial-gradient(closest-side,rgba(199,210,254,0.50),transparent)]  " />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Ready for a website that actually brings in clients?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Tell us about your project and get a free, no-obligation quote within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#3b1ab0] shadow-xl transition-transform hover:scale-[1.04]"
              >
                Get a free quote
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
