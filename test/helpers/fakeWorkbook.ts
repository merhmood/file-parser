import { Sheets } from '@/types/sheetDropZoneTypes';

export default function fakeWorkbook(): Sheets[] {
  return [
    {
      name: 'fakeSheet',
      rows: [
        ['tips', 'attendant', 'check'],
        [20, 'jess', 300],
        [10, 'mandy', 1000],
        [30, 'penny', 400],
        [50, 'kathelin', 2000],
        [50, 'amanda', 300],
        [20, 'jess', 300],
        [10, 'mandy', 1000],
        [30, 'penny', 400],
        [50, 'kathelin', 2000],
        [50, 'amanda', 300],
      ],
    },
  ];
}
