"use client";
import Image from "next/image";
import React from "react";
import BgLanding from "@/assets/BgLanding.png";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
};

export default function Title({ title, subtitle }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-6">
      <Image
        src={BgLanding}
        alt="Background"
        fill
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-white opacity-40 z-1" />

      <div className="absolute w-1/2 flex items-center flex-col z-10">
        <motion.div
          className="text-6xl font-bold text-[#ECF7FD] py-5"
          style={{ textShadow: "6px 6px 12px #105F94" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.div>

        <motion.div
          className="text-[#3E424A] text-center text-xl font-normal mt-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {subtitle}
        </motion.div>

      </div>
    </div>
  );
}
