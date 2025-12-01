"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { fetchNotes, type FetchNotesParams } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import StatusError from "../../components/StatusError/StatusError";
import StatusLoader from "../../components/StatusLoader/StatusLoader";
import css from "./Notes.module.css";

export default function NotesClient() {
  const [params, setParams] = useState<FetchNotesParams>({
    page: 1,
    perPage: 10,
    search: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", params],
    queryFn: () => fetchNotes(params),
    placeholderData: (previousData) => previousData,
  });

  const handleSearch = (searchTerm: string) => {
    setParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  if (error) {
    return <StatusError message={error.message} />;
  }

  const isDataLoading = isLoading && !data;

  return (
    <div className={css.container}>
      <h1 className={css.pageTitle}>Your Notes</h1>
      <div className={css.controls}>
        <SearchBox searchTerm={params.search ?? ''} setSearchTerm={handleSearch} />
        
        <button
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          + New Note
        </button>
      </div>

      {isDataLoading && <StatusLoader />}

      {!isDataLoading && data && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={params.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!isDataLoading && data && data.notes.length === 0 && (
        <p className={css.noResults}>No notes found matching your criteria.</p>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}