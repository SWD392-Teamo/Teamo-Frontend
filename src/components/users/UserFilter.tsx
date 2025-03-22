import { useParamsStore } from "@/hooks/useParamsStore";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";

export default function UserFilter() {
  /**GLOBAL STATE MANAGEMENT */
  const setParams = useParamsStore((state) => state.setParams);
  const sort = useParamsStore((state) => state.sort);
  const status = useParamsStore((state) => state.status);

  useEffect(() => {
    if (!status) {
      setParams({ status: "active" });
    }
  }, [status, setParams]);

  return (
    <div className="flex flex-row justify-between items-center w-full mb-5">
      <div className="flex gap-5">
        <Button
          className={`btn ${
            status === "active" ? "btn--primary" : "btn--primary--outline"
          }`}
          onClick={() => setParams({ status: "active" })}
        >
          Active
        </Button>
        <Button
          className={`btn ${
            status === "banned" ? "btn--primary" : "btn--primary--outline"
          }`}
          onClick={() => setParams({ status: "banned" })}
        >
          Banned
        </Button>
      </div>
    </div>
  );
}
