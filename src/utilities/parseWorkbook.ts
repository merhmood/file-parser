import * as XLSX from 'xlsx';

import { Sheets } from '@/types/sheetDropZoneTypes';

export default function parseWorkbook(data: ArrayBuffer) {
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
