/**
 * FileUploadDropZone Component
 * imgFileValidator function
 * Upload component
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './FileUploadDropZone.module.css';

type FileUploadDropZoneFileObject = {
  img: File | null;
  imgUrl: string;
  imgName: string;
};

export default function FileUploadDropZone() {
  const [imgObject, setImgObject] = useState<FileUploadDropZoneFileObject>({
    img: null,
    imgUrl: '',
    imgName: '',
  });
  const [dropZoneEnter, setDropZoneEnter] = useState(false);
  const [fileUploadIcon, setFileUploadIcon] = useState('/image (1).png');
  const [invalidFile, setInvalidFile] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const fileImageClickHandler = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0];
      const isValid = imgFileValidator(img);
      if (isValid) {
        setImgObject({
          img,
          imgUrl: URL.createObjectURL(img),
          imgName: img.name,
        });
        setInvalidFile(false);
      } else {
        setInvalidFile(true);
      }
    }
  };

  const fileDropHandler = (e: React.DragEvent) => {
    dragLeave(e);
    const img = e.dataTransfer.files[0];
    const isValid = imgFileValidator(img);
    if (isValid) {
      setImgObject({
        img,
        imgUrl: URL.createObjectURL(img),
        imgName: img.name,
      });
      setInvalidFile(false);
    } else {
      setInvalidFile(true);
    }
  };

  const dropZoneHandler = (e: React.DragEvent) => {
    // This changes the color && image to the
    // highlight color and image
    preventDefault(e);
    setDropZoneEnter(true);
    setFileUploadIcon('/image.png');
    setImgObject({
      img: null,
      imgUrl: '',
      imgName: '',
    });
  };

  const dragLeave = (e: React.DragEvent) => {
    // This changes the highlight color && image back
    // to their initial color && image
    preventDefault(e);
    setDropZoneEnter(false);
    setFileUploadIcon('/image (1).png');
  };

  const preventDefault = (e: React.DragEvent) => {
    // Stops the default element behaviour. This feature leads to
    // the browser opening new tabs when the file is dropped in
    // in the application window, to prevent that, the drag event
    // default behaviour was prevented
    e.preventDefault();
  };

  useEffect(() => {
    console.log(imgObject);
  });

  return (
    <>
      <div
        className={
          !dropZoneEnter
            ? styles['file-upload-drop-zone']
            : `${styles['file-upload-drop-zone']} ${styles['highlight']}`
        }
        onDrop={fileDropHandler}
        onDragEnd={preventDefault}
        onDragOver={dropZoneHandler}
        onDrag={preventDefault}
        onDragEnter={dropZoneHandler}
        onDragLeave={dragLeave}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fileUploadIcon}
            alt='drop-zone'
            onClick={fileImageClickHandler}
          />
        }

        <p>Drop file here or click on image to upload file</p>
        <input
          type='file'
          ref={fileUploadRef}
          onChange={fileUploadHandler}
          multiple
        />
      </div>
      {!invalidFile && imgObject.img !== null && (
        <Upload imgObject={imgObject} styles={styles} />
      )}
      {invalidFile && <p className={styles.invalid}>Invalid file</p>}
    </>
  );
}

function imgFileValidator(file: File) {
  const fileType = file.type.split('/');
  if (fileType[0] === 'image') {
    return true;
  } else {
    return false;
  }
}

type UploadProps = {
  imgObject: FileUploadDropZoneFileObject;
  styles: { [key: string]: string };
};

function Upload({ imgObject, styles }: UploadProps) {
  return (
    <div className={styles.upload}>
      <Image
        src={imgObject.imgUrl}
        alt=''
        width={100}
        height={100}
        className={styles['upload-img']}
      />
      <p>{imgObject.imgName}</p>
    </div>
  );
}
