export function getFileName(filePath: string): string {
  const parts = filePath.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1] || filePath;
}

export function getFileExtension(filePath: string): string {
  const fileName = getFileName(filePath);
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex === -1 || dotIndex === 0) return '';
  return fileName.substring(dotIndex);
}

export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}
