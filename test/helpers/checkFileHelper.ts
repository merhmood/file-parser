import FakeFileClass from '../mocks/file';

function checkFileHelper() {
  let stubFile = FakeFileClass;
  let result = {
    file: stubFile,
    fileValidator: jest.fn(),
    fileHandler: jest.fn(),
    setWorkbook: jest.fn(),
    setTableContent: jest.fn(),
    setLoadmoreCursor: jest.fn(),
    setInvalidFile: jest.fn(),
  };
  stubFile.mockRestore();
  return result;
}

export default checkFileHelper;
