export default function fileValidator(file: File): boolean {
  let fileType = file.type.split('/');
  // check is file type is csv
  if (fileType[0] === 'text' && fileType[1] === 'csv') {
    return true;
  } else {
    // The file type string structure for sheet file is different
    // from that of csv, when have split the string differently
    // inorder to check the file type for sheet.
    if (fileType[0] === 'application') {
      fileType = file.type.split('.');
      // check if file type is sheet
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
