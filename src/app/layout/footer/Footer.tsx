import FooterSection from "@/components/FooterSection";
import React from "react";
import { LiaApple, LiaGooglePlay } from "react-icons/lia";

export default async function Footer() {
  return (
    <div className="">
      <footer className="bg-white border border-gray-200 flex flex-wrap justify-evenly items-center ">
        <div className="my-4">
          <FooterSection
            title="Support"
            contents={["FAQ", "Privacy Policy", "Terms Of Use"]}
          />
        </div>

        <div className="my-4">
          <FooterSection
            title="About Us"
            contents={["FAQ", "Privacy Policy", "Terms Of Use"]}
          />
        </div>

        <div className="my-4">
          <button className=" border-black border-2 px-8 py-2 rounded-full flex items-center justify-items-start mb-2 w-full font-semibold font-beVietnam">
            <LiaGooglePlay size={30} className="mr-2" /> Google Play
          </button>
          <button className="border-2 border-black px-8 py-2 rounded-full flex items-center justify-items-start w-full font-semibold font-beVietnam">
            <LiaApple size={30} className="mr-2" /> App Store
          </button>
        </div>
      </footer>
      <div className="text-center bg-white text-gray-500 py-4 font-beVietnam">
        Teamo Copyright &copy; 2024
      </div>
    </div>
  );
}
