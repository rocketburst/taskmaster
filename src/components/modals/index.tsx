"use client";

import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import SortModal from "./SortModal";
import SummaryModal from "./SummaryModal";
import UploadModal from "./UploadModal";

export default function Modals() {
  return (
    <>
      <CreateModal />
      <EditModal />
      <SortModal />
      <SummaryModal />
      <UploadModal />
    </>
  );
}
