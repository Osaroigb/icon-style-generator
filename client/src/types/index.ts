export type StyleId = 1 | 2 | 3 | 4 | 5;

export type OutputFormat = 'png' | 'jpg';

export interface GenerateRequest {
  prompt: string;
  style: StyleId;
  colors?: string[];
  outputFormat?: OutputFormat;
  outputQuality?: number;
}

export interface GenerateResponse {
  success: boolean;
  images?: string[];
  format?: OutputFormat;
  error?: string;
}

export interface StyleOption {
  id: StyleId;
  name: string;
  description: string;
}

