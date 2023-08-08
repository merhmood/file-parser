// Allow only csv and sheet file
export default function fileValidator(file: File): boolean {
  let fileType = file.type.split('/');
  if (fileType[0] === 'text' && fileType[1] === 'csv') {
    return true;
  } else {
    if (fileType[0] === 'application') {
      fileType = file.type.split('.');
      if (fileType[fileType.length - 1] === 'sheet') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
