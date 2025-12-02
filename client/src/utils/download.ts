import { resizeImage } from './imageProcessing';

export async function downloadImage(
  imageUrl: string,
  fileName: string,
  format: 'png' | 'jpg' = 'png'
): Promise<void> {
  try {
    const blob = await resizeImage(imageUrl, format);
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${format}`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error(`Failed to download image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function downloadAllImages(
  imageUrls: string[],
  baseFileName: string,
  format: 'png' | 'jpg' = 'png'
): Promise<void> {
  for (let i = 0; i < imageUrls.length; i++) {
    await downloadImage(imageUrls[i], `${baseFileName}-${i + 1}`, format);
    // Small delay between downloads
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}
