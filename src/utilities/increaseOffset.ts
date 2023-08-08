import { LoadmoreCursor, Sheets } from '@/types/sheetDropZoneTypes';

export default function increaseOffset(
  loadmoreCursor: LoadmoreCursor,
  setLoadmoreCursor: React.Dispatch<React.SetStateAction<LoadmoreCursor>>,
  workbook: Sheets[]
) {
  const next = loadmoreCursor.next;
  const endOfWorkBookFile = workbook[0]?.rows.length - 1;
  // increase current and next to 50
  if (next < endOfWorkBookFile && next + 50 < endOfWorkBookFile) {
    setLoadmoreCursor((state) => {
      return newLoadmoreCursorState(state.current + 50, state.next + 50, false);
    });
    // increase current to 50 and increase to next to end of file
  } else if (next < endOfWorkBookFile && next + 50 > endOfWorkBookFile) {
    setLoadmoreCursor((state) => {
      return newLoadmoreCursorState(
        state.current + 50,
        endOfWorkBookFile,
        true
      );
    });
  }
}

function newLoadmoreCursorState(
  current: number,
  next: number,
  endOfFile: boolean
) {
  return { current, next, endOfFile };
}
