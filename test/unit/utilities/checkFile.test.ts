import checkFile from '@/utilities/checkFile';
import checkFileHelper from '../../helpers/checkFileHelper';

test('writing test to see if filevalidator is called with file', () => {
  const fakeCheckFileParameters: any = checkFileHelper();
  const mockFileValidator = fakeCheckFileParameters.fileValidator;
  checkFile(fakeCheckFileParameters);
  expect(mockFileValidator).toHaveBeenCalledWith(fakeCheckFileParameters.file);
});
