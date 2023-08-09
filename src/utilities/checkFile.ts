import { CheckFileParameters } from '@/types/sheetDropZoneTypes';

export default function checkFile(checkFileParameters: CheckFileParameters) {
  const { file, setTableContent, setInvalidFile, fileValidator, fileHandler } =
    checkFileParameters;
  const isValid = fileValidator(file);
  if (isValid) {
    fileHandler({ ...checkFileParameters });
    setInvalidFile(false);
  } else {
    // Remove current table from screen and show inValid message
    // only
    setTableContent([]);
    setInvalidFile(true);
  }
}
