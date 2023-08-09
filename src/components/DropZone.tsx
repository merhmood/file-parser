'use client';

import { useState } from 'react';
import { DropZoneProps } from '@/types/sheetDropZoneTypes';
import checkFile from '@/utilities/checkFile';
import styles from '@/components/SheetUploadDropZone.module.css';
import fileValidator from '@/utilities/fileValidator';
import fileHandler from '@/utilities/fileHandler';

export default function DropZone(props: DropZoneProps) {
  const {
    uploadButtonClick,
    fileRef,
    setWorkbook,
    setTableContent,
    setLoadmoreCursor,
    setInvalidFile,
  } = props;
  const [fileDropZoneEnter, setFileDropZoneEnter] = useState(false);
  const [fileUploadIcon, setFileUploadIcon] = useState('/upload (1).png');

  const checkFileData = {
    setWorkbook,
    setTableContent,
    setLoadmoreCursor,
    setInvalidFile,
    fileHandler,
    fileValidator,
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      checkFile({ file, ...checkFileData });
    }
  };

  const fileDropHandler = (e: React.DragEvent) => {
    dragLeave(e);
    const file = e.dataTransfer.files[0];
    checkFile({ file, ...checkFileData });
  };

  const withinDropZone = (e: React.DragEvent) => {
    // This changes the color && image to the
    // highlight color and image
    dropZoneToggler(e, true, '/upload.png');
  };

  const dragLeave = (e: React.DragEvent) => {
    // This changes the highlight color && image back
    // to their initial color && image
    dropZoneToggler(e, false, '/upload (1).png');
  };

  const dropZoneToggler = (
    e: React.DragEvent,
    fileDropZoneEnter: boolean,
    fileUploadIcon: string
  ) => {
    e.preventDefault();
    setFileDropZoneEnter(fileDropZoneEnter);
    setFileUploadIcon(fileUploadIcon);
  };

  return (
    <div
      className={
        !fileDropZoneEnter
          ? styles['file-upload-drop-zone']
          : `${styles['file-upload-drop-zone']} ${styles['highlight']}`
      }
      onDrop={fileDropHandler}
      onDragEnd={withinDropZone}
      onDragOver={withinDropZone}
      onDragEnter={withinDropZone}
      onDragLeave={dragLeave}
    >
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fileUploadIcon} alt='file-drop' />
      }
      <p>
        Drag and Drop sheet (csv or excel file) or click
        <button onClick={uploadButtonClick}>Upload</button>
      </p>
      <input type='file' ref={fileRef} onChange={fileUploadHandler} />
    </div>
  );
}
