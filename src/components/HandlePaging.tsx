import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  visibleItems: number;
  totalItems: number;
  handleSeeMore: () => void;
  handleSeeLess: () => void;
};
export default function HandlePaging({
  visibleItems,
  totalItems,
  handleSeeMore,
  handleSeeLess,
}: Props) {
  return (
    <div>
      {visibleItems < totalItems ? (
        <div className="mt-8 flex justify-center">
          <button
            className="text-logo text-lg hover:underline flex flex-row items-center gap-2"
            onClick={handleSeeMore}
          >
            <div>See More</div>
            <FaChevronDown color="gray" />
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <button
            className="text-logo text-lg hover:underline flex flex-row items-center gap-2"
            onClick={handleSeeLess}
          >
            <div>See Less</div>
            <FaChevronUp color="gray" />
          </button>
        </div>
      )}
    </div>
  );
}
