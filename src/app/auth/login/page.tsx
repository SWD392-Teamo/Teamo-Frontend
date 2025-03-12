"use client";

import React from "react";
import LoginForm from "./LoginForm";
import Title from "@/components/Home/Title";
import BackButton from "@/components/BackButton";

export default function page() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <BackButton url="/" />
        <h2 className="mb-6 text-center text-2xl font-bold">Welcome back!</h2>
        <LoginForm />
      </div>
    </div>
  );
}
