import {
  Sheets,
  ArrayOfNumberAndString,
  LoadmoreCursor,
} from '@/types/sheetDropZoneTypes';

export default function loadMoreHandler(
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
    result.push(workbook[0]?.rows[start]);
  }
  return result;
}
