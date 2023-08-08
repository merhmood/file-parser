'use client';

import { useRef, useState } from 'react';

import DropZone from '@/components/DropZone';
import {
  Sheets,
  ArrayOfNumberAndString,
  LoadmoreCursor,
} from '@/types/sheetDropZoneTypes';
import TableSection from '@/components/TableSection';
import styles from './SheetUploadDropZone.module.css';

export default function SheetUploadDropZone() {
  const [workbook, setWorkbook] = useState<Sheets[]>([]);
  const [loadmoreCursor, setLoadmoreCursor] = useState<LoadmoreCursor>({
    current: 1,
    next: 50,
    endOfFile: false,
  });
  const [tableContent, setTableContent] = useState<ArrayOfNumberAndString>([]);
  const [invalidFile, setInvalidFile] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadButtonClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  return (
    <>
      <DropZone
        {...{
          uploadButtonClick,
          fileRef,
          setWorkbook,
          setTableContent,
          setLoadmoreCursor,
          setInvalidFile,
        }}
      />
      {
        // Shows invalid file when text
        invalidFile && <p className={styles.invalid}>Invalid file</p>
      }
      {
        // Renders the table section
        workbook[0] && (
          <TableSection
            {...{
              workbook,
              tableContent,
              loadmoreCursor,
              setTableContent,
              setLoadmoreCursor,
            }}
          />
        )
      }
    </>
  );
}
