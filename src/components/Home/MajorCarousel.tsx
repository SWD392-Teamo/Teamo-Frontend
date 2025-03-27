"use client";
import { getData } from "@/actions/majorActions";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import { Major } from "@/types";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import DateConverter from "../DateConvert";
import MajorImg from "../image/MajorImg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import DecorBanner from "@/assets/DecorBanner.png";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MajorCarousel() {
   const { setSelectedMajor } = useMajorStore();

  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      // search: state.search,
    }))
  );

  const data = useMajorStore(
    useShallow((state) => ({
      majors: state.majors,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useMajorStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
    },
  });

  useEffect(() => {
    getData(url)
      .then((data) => {
        console.log("data", data);
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {});
  }, [url, setData]);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = () => {
    setCurrentPage((prev) =>
      prev === 0 ? Math.ceil(data.majors.length / 4) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev === Math.ceil(data.majors.length / 4) - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#BFE3F3] to-white pb-10">
      <div className="relative w-full h-64 flex flex-col items-center justify-center">
        <Image
          src={DecorBanner}
          alt="NavDeco"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-10 w-1/2 flex items-center flex-col">
          <motion.div
            className="mt-7 text-3xl text-[#3E424A] font-bold"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            MAJORS
          </motion.div>
        </div>
      </div>

      <div className="container flex items-center relative">
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-gray-600" size={40} />
        </button>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            initial={{ x: "100%" }}
            animate={{ x: `-${currentPage * 100}%` }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          >
            {Array.from({ length: Math.ceil(data.majors.length / 4) }).map(
              (_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex w-full flex-shrink-0 gap-5 p-10"
                >
                  {data.majors
                    .slice(pageIndex * 4, (pageIndex + 1) * 4)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="w-1/4 border-[#C5E7FB] bg-white p-2 pb-10 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl "
                      >
                        <MajorImg imgUrl={item.imgUrl} />
                        <div className="flex flex-col items-center">
                          <p className="text-lg font-semibold">{item.name}</p>
                          <h3 className="text-xl font-semibold">{item.code}</h3>
                          <Link href={`${item.code}/subjects`}>
                            <button
                              className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold"
                              onClick={() => setSelectedMajor(item)}
                            >
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}

                  {pageIndex === Math.ceil(data.majors.length / 4) - 1 &&
                    data.majors.length % 4 !== 0 &&
                    Array.from({ length: 4 - (data.majors.length % 4) }).map(
                      (_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="w-1/4 flex-shrink-0 p-4"
                        ></div>
                      )
                    )}
                </div>
              )
            )}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md"
          aria-label="Next"
        >
          <FaChevronRight className="text-gray-600" size={40} />
        </button>
      </div>
    </div>
  );
}
