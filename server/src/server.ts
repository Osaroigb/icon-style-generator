import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { buildPrompt } from './services/promptBuilder';
import { generateIcons } from './services/replicateService';
import { isValidHex } from './utils/colorUtils';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Icon Style Generator API is running',
    timestamp: new Date().toISOString(),
  });
});

// Rate limiting for generate endpoint
const generateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: {
    success: false,
    error: 'Too many requests. Please wait a minute before trying again.'
  }
});

// Generate icons endpoint
app.post('/generate', generateLimiter, async (req: Request, res: Response) => {
  try {
    const { prompt, style, colors, outputFormat, outputQuality } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and must be a non-empty string'
      });
    }

    // Validate prompt length
    if (prompt.trim().length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is too long. Maximum 500 characters.'
      });
    }

    // Validate style
    if (!style || typeof style !== 'number' || style < 1 || style > 5) {
      return res.status(400).json({
        success: false,
        error: 'Style is required and must be a number between 1 and 5'
      });
    }

    // Validate colors if provided
    if (colors) {
      if (!Array.isArray(colors)) {
        return res.status(400).json({
          success: false,
          error: 'Colors must be an array of HEX color strings'
        });
      }
      
      for (const color of colors) {
        if (!isValidHex(color)) {
          return res.status(400).json({
            success: false,
            error: `Invalid color format: ${color}. Must be valid HEX (e.g., #FF6B9D)`
          });
        }
      }
    }

    // Validate output format if provided
    if (outputFormat && outputFormat !== 'png' && outputFormat !== 'jpg') {
      return res.status(400).json({
        success: false,
        error: 'Output format must be either "png" or "jpg"'
      });
    }

    // Validate output quality if provided
    if (outputQuality !== undefined) {
      if (typeof outputQuality !== 'number' || outputQuality < 0 || outputQuality > 100) {
        return res.status(400).json({
          success: false,
          error: 'Output quality must be a number between 0 and 100'
        });
      }
    }

    // Build the prompt
    const finalPrompt = buildPrompt(prompt, style, colors);
    console.log('Generated prompt:', finalPrompt);

    // Generate icons
    const result = await generateIcons({
      prompt: finalPrompt,
      outputFormat: outputFormat || 'png',
      outputQuality: outputQuality
    });

    // Return success response
    res.json({
      success: true,
      images: result.imageUrls,
      format: result.format
    });

  } catch (error) {
    console.error('Error in /generate route:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate icons'
    });
  }
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  res.status(500).json({
    success: false,
    error: env.nodeEnv === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
});

const PORT = env.port;

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🚀 Icon Style Generator Server');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📡 Environment: ${env.nodeEnv}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log('═══════════════════════════════════════════════════════');
});
