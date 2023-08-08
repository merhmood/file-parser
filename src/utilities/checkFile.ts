import { CheckFileParameter } from '@/types/sheetDropZoneTypes';
import fileValidator from '@/utilities/fileValidator';
import fileHandler from '@/utilities/fileHandler';

export default function checkFile(checkFileParameters: CheckFileParameter) {
  const {
    file,
    setWorkbook,
    setTableContent,
    setLoadmoreCursor,
    setInvalidFile,
  } = checkFileParameters;
  const isValid = fileValidator(file);
  if (isValid) {
    fileHandler(file, setWorkbook, setTableContent, setLoadmoreCursor);
    setInvalidFile(false);
  } else {
    setTableContent([]);
    setInvalidFile(true);
  }
}
