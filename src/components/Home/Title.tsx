import Image from "next/image";
import React from "react";
import BgLanding from "@/assets/BgLanding.png";
import { BiSearch } from "react-icons/bi";

type Props = {
  title: string;
  subtitle?: string;
};

export default function Title({ title, subtitle }: Props) {
  return (
    <div className="mb-5 relative w-full h-screen flex flex-col items-center content-start justify-center px-6">
      <Image
        src={BgLanding}
        alt="Background"
        fill
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-white opacity-40 z-1" />

      <div className="absolute w-1/2 flex items-center flex-col">
        <div
          className="text-6xl font-bold text-[#ECF7FD] py-5"
          style={{ textShadow: "6px 6px 12px #105F94" }}
        >
          {title}
        </div>
        <div
          className=" text-[#3E424A] text-center text-xl font-normal mt-2 "
        >
          {subtitle}
        </div>
        <div className="mt-7 text-3xl text-[#3E424A] font-bold">
          Start your team journey!
        </div>
        <form className="mt-6 relative w-full">
          <input
            type="text"
            className="w-full pl-10 pr-24 py-4 rounded-full  border border-gray-300 focus:ring-2 focus:ring-logo focus:outline-none text-lg text-gray-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#58A4E9] p-3 rounded-full"
          >
            <BiSearch className="text-white" size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
