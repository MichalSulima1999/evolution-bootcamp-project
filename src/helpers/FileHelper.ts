export function getFilenamesFromFolder(
  folderPath: string,
  imageName: string,
  numberOfImages: number
): string[] {
  const files: string[] = [];

  for (let i = 0; i < numberOfImages; i++) {
    files.push(`${folderPath}/${imageName}-${i + 1}.png`);
  }

  return files;
}
