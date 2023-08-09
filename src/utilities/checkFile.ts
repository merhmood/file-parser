import { CheckFileParameter } from '@/types/sheetDropZoneTypes';

export default function checkFile(checkFileParameters: CheckFileParameter) {
  const {
    file,
    setWorkbook,
    setTableContent,
    setLoadmoreCursor,
    setInvalidFile,
    fileValidator,
    fileHandler,
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
