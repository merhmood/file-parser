import checkFile from '@/utilities/checkFile';
import checkFileHelper from '../../helpers/checkFileHelper';

test('check filevalidator is called with file', () => {
  const fakeCheckFileParameters: any = checkFileHelper();
  const mockFileValidator = fakeCheckFileParameters.fileValidator;
  checkFile(fakeCheckFileParameters);
  expect(mockFileValidator).toHaveBeenCalledWith(fakeCheckFileParameters.file);
});

test('check if functions is called with the correct parameters when isValid true', () => {
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

  expect(mockFileHandler).toBeCalledWith({
    ...fakeCheckFileParameters,
    fileValidator: stubfileValidator,
  });
  expect(mockSetInvalidFile).toBeCalledWith(false);
});

test('check if functions is called with the correct parameters when isValid false', () => {
  const fakeCheckFileParameters: any = checkFileHelper();
  const mockSetTableContent = fakeCheckFileParameters.setTableContent;
  const mockSetInvalidFile = fakeCheckFileParameters.setInvalidFile;
  const stubfileValidator = () => false;
  checkFile({
    ...fakeCheckFileParameters,
    setTableContent: mockSetTableContent,
    setInvalidFile: mockSetInvalidFile,
    fileValidator: stubfileValidator,
  });
  expect(mockSetTableContent).toBeCalledWith([]);
  expect(mockSetInvalidFile).toBeCalledWith(true);
});
