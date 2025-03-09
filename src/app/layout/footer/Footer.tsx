import FooterSection from "@/components/FooterSection";
import React from "react";
import { LiaApple, LiaGooglePlay } from "react-icons/lia";

export default async function Footer() {
  return (
    <div className="">
      <footer className="bg-white border border-gray-200 flex flex-wrap justify-evenly items-center ">
        <div className="my-2">
          <FooterSection
            title="Support"
            contents={["FAQ", "Privacy Policy", "Terms Of Use"]}
          />
        </div>

        <div className="my-2">
          <FooterSection
            title="About Us"
            contents={["FAQ", "Privacy Policy", "Terms Of Use"]}
          />
        </div>

        <div className="my-2">
          <button className=" border-black border-2 px-6 py-2 rounded-full flex items-center justify-items-start mb-2 w-full font-semibold text-sm  font-beVietnam">
            <LiaGooglePlay size={20} className="mr-2" /> Google Play
          </button>
          <button className="border-2 border-black px-6 py-2 rounded-full flex items-center justify-items-start w-full font-semibold text-sm font-beVietnam">
            <LiaApple size={20} className="mr-2" /> App Store
          </button>
        </div>
      </footer>
      <div className="text-center bg-white text-gray-500 py-2 font-beVietnam">
        Teamo Copyright &copy; 2024
      </div>
    </div>
  );
}
