import FakeFileClass from '../mocks/file';
import fileValidator from '../mocks/fileValidator';

function checkFileHelper() {
  let stubFile = FakeFileClass;
  let result = {
    file: stubFile,
    fileValidator: fileValidator,
    setWorkbook: jest.fn(),
    setTableContent: jest.fn(),
    setLoadmoreCursor: jest.fn(),
    setInvalidFile: jest.fn(),
  };
  stubFile.mockRestore();
  return result;
}

export default checkFileHelper;
