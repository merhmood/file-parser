'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

import styles from './SheetUploadDropZone.module.css';

type Sheets = { name: string; rows: Array<string | number> };
type ArrayOfNumberAndString = Array<number | string>;
type LoadmoreCursor = {
  current: number;
  next: number;
  endOfFile: boolean;
};

export default function SheetUploadDropZone() {
  const [workbook, setWorkbook] = useState<Sheets[]>([]);
  const [fileDropZoneEnter, setFileDropZoneEnter] = useState(false);
  const [fileUploadIcon, setFileUploadIcon] = useState('/upload (1).png');
  const [loadmoreCursor, setLoadmoreCursor] = useState({
    current: 1,
    next: 50,
    endOfFile: false,
  });
  const [renderedTableContent, setRenderedTableContent] =
    useState<ArrayOfNumberAndString>([]);
  const [invalidFile, setInvalidFile] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadButtonClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      checkFile(file);
    }
  };

  const fileDropHandler = (e: React.DragEvent) => {
    dragLeave(e);
    const file = e.dataTransfer.files[0];
    checkFile(file);
  };

  const checkFile = (file: File) => {
    const isValid = FileValidator(file);
    if (isValid) {
      setLoadmoreCursor(() => {
        return { current: 1, next: 50, endOfFile: false };
      });
      setRenderedTableContent([]);
      fileHandler(file);
      setInvalidFile(false);
    } else {
      setRenderedTableContent([]);
      setInvalidFile(true);
    }
  };

  const fileHandler = (file: File) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result !== 'string') {
          const data = new Uint8Array(e.target.result);
          const parseWorkbookData = parseWorkbook(data);
          setWorkbook(parseWorkbookData);
          setRenderedTableContent(
            loadMoreHandler(
              parseWorkbookData,
              renderedTableContent,
              loadmoreCursor
            )
          );
          if (!loadmoreCursor.endOfFile) increaseOffset();
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const fileDropZoneHandler = (e: React.DragEvent) => {
    // This changes the color && image to the
    // highlight color and image
    preventDefault(e);
    setFileDropZoneEnter(true);
    setFileUploadIcon('/upload.png');
  };

  const dragLeave = (e: React.DragEvent) => {
    // This changes the highlight color && image back
    // to their initial color && image
    preventDefault(e);
    setFileDropZoneEnter(false);
    setFileUploadIcon('/upload (1).png');
  };

  const preventDefault = (e: React.DragEvent) => {
    // Stops the default element behaviour. This feature leads to
    // the browser opening new tabs when the file is dropped in
    // in the application window, to prevent that, the drag event
    // default behaviour was prevented
    e.preventDefault();
  };

  function increaseOffset() {
    const next = loadmoreCursor.next;
    const endOfWorkBookFile = workbook[0]?.rows.length - 1;
    if (next < endOfWorkBookFile && next + 50 < endOfWorkBookFile) {
      setLoadmoreCursor((state) => {
        return {
          current: state.current + 50,
          next: state.next + 50,
          endOfFile: false,
        };
      });
    } else if (next < endOfWorkBookFile && next + 50 > endOfWorkBookFile) {
      setLoadmoreCursor((state) => {
        return {
          current: state.current + 50,
          next: endOfWorkBookFile,
          endOfFile: true,
        };
      });
    }
  }

  useEffect(() => {
    console.log(workbook);
    console.log(loadmoreCursor);
    console.log(renderedTableContent);
  });

  return (
    <>
      <div
        className={
          !fileDropZoneEnter
            ? styles['file-upload-drop-zone']
            : `${styles['file-upload-drop-zone']} ${styles['highlight']}`
        }
        onDrop={fileDropHandler}
        onDragEnd={preventDefault}
        onDragOver={fileDropZoneHandler}
        onDrag={preventDefault}
        onDragEnter={fileDropZoneHandler}
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
      {invalidFile && <p className={styles.invalid}>Invalid file</p>}
      <div>
        {renderedTableContent.map((element) => (
          <>
            <p key={element as string | number}>{element as ReactNode}</p>
          </>
        ))}
        {!loadmoreCursor.endOfFile && renderedTableContent.length > 0 && (
          <button
            onClick={() => {
              setRenderedTableContent(
                loadMoreHandler(workbook, renderedTableContent, loadmoreCursor)
              );
              increaseOffset();
            }}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}

function parseWorkbook(data: ArrayBuffer) {
  const workbook = XLSX.read(data, { type: 'array' });
  const sheets: Sheets[] = [];

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<
      string | number
    >;
    sheets.push({ name: sheetName, rows });
  });

  return sheets;
}

function FileValidator(file: File): boolean {
  let fileType = file.type.split('/');
  if (fileType[0] === 'text' && fileType[1] === 'csv') {
    return true;
  } else {
    if (fileType[0] === 'application') {
      fileType = file.type.split('.');
      if (fileType[fileType.length - 1] === 'sheet') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

const loadMoreHandler = (
  workbook: Sheets[],
  renderedTableContent: ArrayOfNumberAndString,
  loadmoreCursor: LoadmoreCursor
) => {
  let result = [...renderedTableContent];
  for (
    let start = loadmoreCursor.current;
    start <= loadmoreCursor.next;
    start++
  ) {
    result.push(workbook[0]?.rows[start]);
  }
  return result;
};
