import BackButton from "@/components/BackButton";
import LookerEmbed from "@/components/dashboard/LookerEmbed";
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-4">
      {/* Header */}
      <BackButton url="/" />
      <div className="flex items-center space-x-3 py-4 px-2">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
      </div>

      {/* Looker */}
      <LookerEmbed />
    </div>
  );
}
