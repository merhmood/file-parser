import {
  Sheets,
  ArrayOfNumberAndString,
  LoadmoreCursor,
} from '@/types/sheetDropZoneTypes';

export default function loadMoreContentHandler(
  workbook: Sheets[],
  tableContent: ArrayOfNumberAndString,
  loadmoreCursor: LoadmoreCursor
) {
  let result = [...tableContent];
  // Add more contents to tableContent
  for (
    let start = loadmoreCursor.current;
    start <= loadmoreCursor.next;
    start++
  ) {
    if (workbook[0]) result.push(workbook[0].rows[start]);
    else throw new Error('workbook missing from parameters or not an array');
  }
  return result;
}
