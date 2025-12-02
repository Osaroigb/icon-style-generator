import { getStyleById } from '../stylePresets';
import { hexToColorName } from '../utils/colorUtils';

// Build the final prompt for image generation
export function buildPrompt(userPrompt: string, styleId: number, colors?: string[]): string {
  if (!userPrompt || userPrompt.trim().length === 0) {
    throw new Error('User prompt cannot be empty');
  }

  const style = getStyleById(styleId);
  
  if (!style) {
    throw new Error(`Invalid style ID: ${styleId}`);
  }

  // Start with the user's theme
  let prompt = `4 different ${userPrompt.trim()} icons, `;
  
  // Add style description
  prompt += style.promptPrefix;
  
  // Add colors if provided
  if (colors && colors.length > 0) {
    const colorNames = colors.map(hexToColorName).join(', ');
    prompt += `, using color palette: ${colorNames}`;
  }

  return prompt;
}
