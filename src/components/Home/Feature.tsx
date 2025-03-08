import Image from "next/image";
import React from "react";
import DecorBanner from "@/assets/DecorBanner.png";
import { BiSearch, BiSolidUserDetail } from "react-icons/bi";
import FeatureCard from "./FeatureCard";
import { FaSearchengin, FaUserGraduate } from "react-icons/fa";

export default function Feature() {
  return (
    <div className="mb-10">
      <div className=" relative w-full h-64 flex flex-col items-center content-start justify-center">
        <Image
          src={DecorBanner}
          alt="NavDeco"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-10 w-1/2 flex items-center flex-col">
          <div className="mt-7 text-3xl text-[#54B9EE] font-bold">
            OUR MAIN FEATURES
          </div>
        </div>
      </div>
      <div className="container flex items-center flex-col mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          <FeatureCard
            icon={<FaUserGraduate size={30} color="#54B9EE" />}
            title="Profile-based Team Matching"
            description="You can create your detailed profiles that showcase your skills, interests, and course involvement."
          />
          <FeatureCard
            icon={<FaSearchengin  size={30} color="#54B9EE" />}
            title="Advanced Search and Filtering"
            description="With powerful search and filter options, you can easily find team members based on your major, subject, skills, or specific requirements."
          />
          <FeatureCard
            icon={<BiSolidUserDetail size={30} color="#54B9EE" />}
            title="Detail information of Teams & Projects"
            description="Discover and join teams that match your skills and interests. View detailed project information and team member profiles with ease."
          />
        </div>
      </div>
    </div>
  );
}
