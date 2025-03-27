"use client";

import ChatAgent from "@/components/ChatAgent";
import { useFilterStore } from "@/hooks/GroupFilterStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const clearFilters = useFilterStore((state) => state.clearFilters);

  useEffect(() => {
    console.log("Route changed to", pathname);

    useFilterStore.setState({
      selectedMajors: [],
      selectedSubjects: [],
      selectedSemesters: [],
      selectedFields: [],
    });
    clearFilters();
  }, [pathname, clearFilters]);

  if (isHomePage) {
    return (
      <>
        {children}
        <ChatAgent />
      </>
    );
  }

  return (
    <main className="main">
      {children}
      <ChatAgent />
    </main>
  );
}
