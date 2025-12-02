import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  replicateApiToken: string;
  port: number;
  nodeEnv: string;
}

function getEnvConfig(): EnvConfig {
  const replicateApiToken = process.env.REPLICATE_API_TOKEN;
  
  if (!replicateApiToken) {
    throw new Error(
      'REPLICATE_API_TOKEN is required. Please set it in your .env file or environment variables.'
    );
  }

  const port = parseInt(process.env.PORT || '3001', 10);
  const nodeEnv = process.env.NODE_ENV || 'development';

  return {
    replicateApiToken,
    port,
    nodeEnv,
  };
}

export const env = getEnvConfig();

