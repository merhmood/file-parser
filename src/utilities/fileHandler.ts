import { FileHandlerParameters } from '@/types/sheetDropZoneTypes';

import parseWorkbook from './parseWorkbook';
import loadMoreHandler from './loadMoreContentHandler';

export default function fileHandler(
  fileHandlerParameters: FileHandlerParameters
) {
  const { file, fileReader, setLoadmoreCursor, setTableContent, setWorkbook } =
    fileHandlerParameters;
  if (file) {
    let reader = new fileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result !== 'string') {
        const data = new Uint8Array(e.target.result);
        const parseWorkbookData = parseWorkbook(data);
        setWorkbook(parseWorkbookData);
        // Mounts an empty list
        setTableContent([]);
        // Updates the empty list with newly upload contents,
        // which will be limited to 50 elements
        setTimeout(() => {
          setTableContent(() =>
            loadMoreHandler(parseWorkbookData, [], {
              current: 1,
              next: 50,
              endOfFile: false,
            })
          );
        }, 50);
        // reset cursor to default value
        setLoadmoreCursor({
          current: 1,
          next: 50,
          endOfFile: false,
        });
      }
    };

    reader.readAsArrayBuffer(file);
  }
}
