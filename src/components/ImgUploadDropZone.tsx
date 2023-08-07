/**
 * FileUploadDropZone Component
 * imgFileValidator function
 * Upload component
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './ImgUploadDropZone.module.css';

type ImgUploadDropZoneFileObject = {
  img: File | null;
  imgUrl: string;
  imgName: string;
};

export default function ImgUploadDropZone() {
  const [imgObject, setImgObject] = useState<ImgUploadDropZoneFileObject>({
    img: null,
    imgUrl: '',
    imgName: '',
  });
  const [imgDropZoneEnter, setImgDropZoneEnter] = useState(false);
  const [imgUploadIcon, setImgUploadIcon] = useState('/image (1).png');
  const [invalidImgFile, setInvalidImgFile] = useState(false);
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const imgDropZoneClickHandler = () => {
    if (imgUploadRef.current) {
      imgUploadRef.current.click();
    }
  };

  const imgUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0];
      const isValid = imgFileValidator(img);
      if (isValid) {
        setImgObject({
          img,
          imgUrl: URL.createObjectURL(img),
          imgName: img.name,
        });
        setInvalidImgFile(false);
      } else {
        setInvalidImgFile(true);
      }
    }
  };

  const imgDropHandler = (e: React.DragEvent) => {
    dragLeave(e);
    const img = e.dataTransfer.files[0];
    const isValid = imgFileValidator(img);
    if (isValid) {
      setImgObject({
        img,
        imgUrl: URL.createObjectURL(img),
        imgName: img.name,
      });
      setInvalidImgFile(false);
    } else {
      setInvalidImgFile(true);
    }
  };

  const imgDropZoneHandler = (e: React.DragEvent) => {
    // This changes the color && image to the
    // highlight color and image
    preventDefault(e);
    setImgDropZoneEnter(true);
    setImgUploadIcon('/image.png');
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
    setImgDropZoneEnter(false);
    setImgUploadIcon('/image (1).png');
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
          !imgDropZoneEnter
            ? styles['img-upload-drop-zone']
            : `${styles['img-upload-drop-zone']} ${styles['highlight']}`
        }
        onDrop={imgDropHandler}
        onDragEnd={preventDefault}
        onDragOver={imgDropZoneHandler}
        onDrag={preventDefault}
        onDragEnter={imgDropZoneHandler}
        onDragLeave={dragLeave}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUploadIcon}
            alt='img-drop-zone'
            onClick={imgDropZoneClickHandler}
          />
        }

        <p>Drop file here or click on image to upload file</p>
        <input
          type='file'
          ref={imgUploadRef}
          onChange={imgUploadHandler}
          multiple
        />
      </div>
      {!invalidImgFile && imgObject.img !== null && (
        <Upload imgObject={imgObject} styles={styles} />
      )}
      {invalidImgFile && <p className={styles.invalid}>Invalid file</p>}
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
  imgObject: ImgUploadDropZoneFileObject;
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
