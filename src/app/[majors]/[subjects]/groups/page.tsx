'use client'

import { getData } from "@/actions/groupActions";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { useLoading } from "@/providers/LoadingProvider";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import GroupHeader from "./GroupHeader";
import GroupCard from "../../../../components/groups/GroupCard";
import { useGroupStore } from "@/hooks/useGroupStore";
import { group } from "console";

export default function Listings() {
  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
    }))
  );

  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  console.log("subject", selectedSubject);
  console.log("major", selectedMajor);


  const { showLoading, hideLoading } = useLoading();
  const [search, setSearch] = useState<string>("");

  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      subjectId: selectedSubject?.id,
      search: state.search,
    }))
  );

  const data = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    showLoading();
    getData(url)
      .then((data) => {
        console.log("data", data);
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, [url, setData, showLoading, hideLoading]);

  console.log(data);



  return (
    <div className="mb-10">
      {selectedMajor && selectedSubject && (
        <GroupHeader subject={selectedSubject} major={selectedMajor} setSearch={setSearch} />
      )}
      <div>
        <div className="grid grid-cols-2 gap-6 ">
          {data.groups &&
            data.groups
              // .slice(0, visibleSubject)
              .map((a) => (
                <GroupCard key={a.id} group={a} />
              ))}
        </div>

        {/* {data.subjects && visibleSubject < data.subjects.length && (
          <div className="mt-8 flex justify-center">
            <button
              className="text-logo text-lg hover:underline flex flex-row items-center gap-2"
              onClick={handleSeeMore}
            >
              <div>See More</div>
              <FaChevronDown color="gray" />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
