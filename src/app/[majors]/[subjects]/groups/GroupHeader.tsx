import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import { Major, Subject } from "@/types";

export default function GroupHeader({ major, subject, setSearch }: { major: Major; subject: Subject; setSearch: React.Dispatch<React.SetStateAction<string>> }) {

  return (
    <div>
      <div className="flex items-center">
        <BackButton />
        <h1 className="subject-back-text ml-4">{major.name}</h1>
      </div>
      <div className="">
        <h1 className="page-title">{subject.code}</h1>
        <h2 className="page-subtitle">{subject.name}</h2>
        <i className="page-description">{subject.description}</i>
      </div>
      <div className="my-10">
        <SearchBar setSearch={setSearch}/>
      </div>
    </div>
  );
};