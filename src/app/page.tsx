"use client";

import Feature from "@/components/Home/Feature";
import Title from "../components/Home/Title";
import MajorCarousel from "@/components/Home/MajorCarousel";
import PostCarousel from "@/components/Home/PostCarousel";
import CustomComponents from "@/components/CustomComponents";

export default function Home() {
  return (
    <div  style={{ all: 'unset' }}>
      <Title
        title="Find Your Team with Ease!"
        subtitle="Teamo helps FPT university students connect with peers for projects, assignments, and group work. Simply browse profiles by subject or major, and form your perfect team in no time."
      />
      <Feature />
      <MajorCarousel />
      <PostCarousel/>
      <CustomComponents/>
    </div>
  );
}
