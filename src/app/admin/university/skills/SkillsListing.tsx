'use client'

import AppModal from '@/components/AppModal';
import AppPagination from '@/components/AppPagination';
import EmptyFilter from '@/components/EmptyFilter';
import GenericTable from '@/components/GenericTable';
import { useSkillStore } from '@/hooks/useSkillStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Skill } from '@/types';
import { Button } from 'flowbite-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { useShallow } from 'zustand/shallow';
import Filter from '../Filter';
import { deleteSkill, getData, getSkillById } from '@/actions/skillActions';
import SkillForm from './SkillForm';

export default function SkillsListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedSkill, setSelectedSkill] = useState<Skill>();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Use skill store
  const data = useSkillStore(
    useShallow((state) => ({
      skills: state.skills,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useSkillStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      ...(search.trim() ? { search } : {}),
    }
  });

  //=====================================
  //      GET SKILLS LIST
  //=====================================

  // Get skills
  function getSkills() {
    getData(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // Get skills data
  useEffect(() => {
    getSkills();
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET SKILL BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getSkill(id);
  }

  async function getSkill(id: number) {
    getSkillById(id)
      .then((data) => {
        setSelectedSkill(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      SKILL TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Skill }[] = [
    { header: "Name", key: "name" },
    { header: "Type", key: "type" },
    { header: "Action", key: "id" }
  ];

  // DELETE ACTION
  const handleDelete = async (id: number) => {
    try {
      showLoading();
      // Delete skill
      await deleteSkill(Number(id));
      getSkills();
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Failed to delete skill");
    } finally {
      hideLoading();
    }
  };

  // ACTION BUTTONS
  const actions = [
    {
      label: "Delete",
      onClick: handleDelete,
      className: "btn btn--primary--outline",
    },
  ];

  return (
    <div className="mb-10 mt-5">
      {/* Create skill Button */}
      <Button 
          className='btn btn--secondary btn--icon'
          
          onClick={() => {
            setSelectedSkill(undefined);
            setShowModal(true);
          }}
          type='button'>
          <AiOutlineEdit size={20} className='me-2'/> Create skill
      </Button>

      {/* Skill Filters */}
      <Filter 
        setSearch={setSearch}
        setPageIndex={setPageIndex} />

      {data.totalCount > 0 ? (
        <>
          {/* Skill Table */}
          {data.skills && (
            <GenericTable<Skill>
              data={data.skills}
              columns={columns}
              actions={actions}
              onRowClick={handleRowClick}
            />
          )}

          {/* Skill Pagination */}
          <div className="flex justify-end mt-5">
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Skill Form Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={selectedSkill == null ? "Create Skill" : "Edit Skill"}
            size="3xl"
          >
            <SkillForm 
              skill={selectedSkill} 
              onCancel={() => setShowModal(false)}
              onSuccess={getSkills} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title="No skill found"
            subtitle="Try changing the filters or reset it completely"
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
