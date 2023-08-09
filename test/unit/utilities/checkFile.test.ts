import checkFile from '@/utilities/checkFile';
import checkFileHelper from '../../helpers/checkFileHelper';

test('check filevalidator is called with file', () => {
  const fakeCheckFileParameters: any = checkFileHelper();
  const mockFileValidator = fakeCheckFileParameters.fileValidator;
  checkFile(fakeCheckFileParameters);
  expect(mockFileValidator).toHaveBeenCalledWith(fakeCheckFileParameters.file);
});

test('check if isvalid block calls functions with correct parameters', () => {
  const fakeCheckFileParameters: any = checkFileHelper();
  const mockFileHandler = fakeCheckFileParameters.fileHandler;
  const mockSetInvalidFile = fakeCheckFileParameters.setInvalidFile;
  const stubfileValidator = () => true;
  checkFile({
    ...fakeCheckFileParameters,
    fileHandler: mockFileHandler,
    setInvalidFile: mockSetInvalidFile,
    fileValidator: stubfileValidator,
  });

  expect(mockFileHandler).toBeCalledWith(
    fakeCheckFileParameters.file,
    fakeCheckFileParameters.setWorkbook,
    fakeCheckFileParameters.setTableContent,
    fakeCheckFileParameters.setLoadmoreCursor
  );
  expect(mockSetInvalidFile).toBeCalledWith(false);
});
