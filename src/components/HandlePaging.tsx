import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  visibleItems: number;
  totalItems: number;
  initialItems: number;
  handleSeeMore: () => void;
  handleSeeLess: () => void;
};
export default function HandlePaging({
  visibleItems,
  totalItems,
  initialItems,
  handleSeeMore,
  handleSeeLess,
}: Props) {
  return (
    <div className="mt-8 flex justify-center">
      {totalItems > initialItems && (
        <button
          className="text-logo text-lg hover:underline flex flex-row items-center gap-2"
          onClick={visibleItems < totalItems ? handleSeeMore : handleSeeLess}
        >
          {visibleItems < totalItems ? (
            <>
              <div>See More</div>
              <FaChevronDown color="gray" />
            </>
          ) : (
            <>
              <div>See Less</div>
              <FaChevronUp color="gray" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
