import BackButton from "../BackButton";
import SearchBar from "../SearchBar";

export default function GroupHeader({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <BackButton url="/" />
      <div className="">
        <h1 className="page-title">Your Group</h1>
      </div>
      <div className="my-10">
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
}
