import Replicate from 'replicate';
import { env } from '../config/env';

const replicate = new Replicate({
  auth: env.replicateApiToken,
});

export interface GenerateIconsOptions {
  prompt: string;
  outputFormat?: 'png' | 'jpg';
  outputQuality?: number;
}

export interface GenerateIconsResult {
  imageUrls: string[];
  format: 'png' | 'jpg';
}

// Generate 4 icons using Replicate Flux-Schnell API
export async function generateIcons(options: GenerateIconsOptions): Promise<GenerateIconsResult> {
  const { prompt, outputFormat, outputQuality } = options;

  // Validate and set output format (never allow undefined or webp)
  const validFormat = (outputFormat === 'jpg' || outputFormat === 'png') 
    ? outputFormat 
    : 'png';

  if (outputFormat && outputFormat !== 'png' && outputFormat !== 'jpg') {
    throw new Error(`Invalid output format: ${outputFormat}. Must be "png" or "jpg"`);
  }

  try {
    // Create timeout promise (60 seconds)
    const timeoutMs = 60000;
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout after 60 seconds')), timeoutMs);
    });

    // Race between API call and timeout
    const output = await Promise.race([
      replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt: prompt,
          num_outputs: 4,
          aspect_ratio: "1:1",
          output_format: validFormat,
          megapixels: "1",
          num_inference_steps: 4,
          go_fast: true,
          disable_safety_checker: false,
          output_quality: outputQuality || 80,
        }
      }),
      timeoutPromise
    ]) as Array<{ url: () => string }>;

    // Validate response
    if (!output || !Array.isArray(output)) {
      throw new Error('Invalid response: expected array of images');
    }

    if (output.length !== 4) {
      throw new Error(`Expected 4 images, got ${output.length}`);
    }

    // Extract image URLs from FileOutput objects
    const imageUrls = output.map((item: any) => {
      // FileOutput objects have a .url() method that returns a URL object
      const urlObj = typeof item.url === 'function' ? item.url() : item;
      
      // URL objects have .href property with the actual string URL
      const url = typeof urlObj === 'object' && urlObj.href ? urlObj.href : String(urlObj);
      return url;
    });

    console.log('Successfully generated 4 icons:', imageUrls);

    return {
      imageUrls,
      format: validFormat,
    };
  } catch (error) {
    console.error('Replicate API error:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to generate icons: ${error.message}` 
        : 'Failed to generate icons'
    );
  }
}
