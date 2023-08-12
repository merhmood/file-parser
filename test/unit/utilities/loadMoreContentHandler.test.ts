import loadMoreContentHandler from '@/utilities/loadMoreContentHandler';
import fakeWorkbook from '../../helpers/fakeWorkbook';

it('check if loadMoreContentHandler returns accurate number of data', () => {
  const fakeCursor = { current: 1, next: 5, endOfFile: false };
  const resultOne = loadMoreContentHandler(fakeWorkbook(), [], fakeCursor);
  const resultTwo = loadMoreContentHandler(
    fakeWorkbook(),
    [
      [10, 'kathy', 150],
      [5, 'amy', 65],
    ],
    fakeCursor
  );
  expect(resultOne.length).toBe(5);
  expect(resultTwo.length).toBe(7);
});

it('check to see if error is thrown when workbook index 0 is missing', () => {
  expect(() =>
    loadMoreContentHandler([], [], {
      current: 1,
      next: 5,
      endOfFile: false,
    })
  ).toThrow('workbook missing from parameters or not an array');
});
