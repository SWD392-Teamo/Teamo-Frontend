import BackButton from "@/app/components/BackButton";
import SearchBar from "@/app/components/SearchBar";
import { Major } from "@/app/models/Major";
import React from "react";

const Home: React.FC<Major> = ({ name }) => {
   console.log("name", name);
  return (
    <div>
      <div className="flex items-center">
        <BackButton url="/majors" />
        <h1 className="subject-back-text ml-4">{name}</h1>
      </div>
      <div className="">
        <h1 className="page-title">Choose Subjects</h1>
      </div>
      <div className="my-10">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
