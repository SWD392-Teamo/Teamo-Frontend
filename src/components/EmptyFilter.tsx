"use client";

import Title from "@/components/Home/Title";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try changing the filter",
  showReset,
  showLogin,
}: Props) {
  const reset = useParamsStore((state) => state.reset);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 justify-center items-center shadow-lg p-5 mt-5 bg-tertiary">
      <h1 className="page-title">Group Application</h1>
      <div className="mt-4">
        {showReset && (
          <Button className="btn btn--primary--outline" onClick={reset}>
            Remove Filters
          </Button>
        )}
        {showLogin && (
          <Button
            className="btn btn--secondary"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
