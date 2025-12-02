import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

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
