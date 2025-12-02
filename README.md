# Icon Style Generator

A lightweight web app that generates a consistent 4-icon set from a single prompt using predefined visual styles. Built with React + Node.js and powered by Replicate's Flux-Schnell image model.

## Features

- 🎨 **5 Preset Visual Styles** - Bold Outlined Pastels, Circular with Dots, Cloud Background, Glossy 3D, Minimalist Silhouette
- 🎯 **Single Prompt Input** - Generate 4 unique themed icons from one description
- 🌈 **Optional Brand Colors** - Steer the color palette with up to 5 HEX colors
- 📦 **Downloadable Icons** - PNG or JPG format, exactly 512×512 pixels
- ⚡ **Fast Generation** - Powered by Flux-Schnell AI model (4-step inference)

## Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety
- **Vite** (Rolldown) 7.2.5 - Build tool & dev server
- **Vitest** 4.0.14 - Testing framework
- **React Testing Library** 16.3.0 - Component testing

### Backend
- **Node.js** 20+ - Runtime
- **Express** 5.2.1 - Web framework
- **TypeScript** 5.9.3 - Type safety
- **Replicate** 1.4.0 - AI API client
- **Jest** 30.2.0 - Testing framework

### AI Model
- **Flux-Schnell** by Black Forest Labs via Replicate API
- 4-step inference, optimized for speed
- Supports PNG/JPG output at 1MP (~1024×1024)

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn
- Replicate API token

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd icon-style-generator-local
```

2. **Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Configure environment variables**

Create `server/.env`:
```env
REPLICATE_API_TOKEN=your_token
PORT=3001
NODE_ENV=development
```

4. **Run the development servers**

```bash
# Terminal 1 - Backend (port 3001)
cd server
npm run dev

# Terminal 2 - Frontend (port 3000)
cd client
npm run dev
```

5. **Open the app**

Visit http://localhost:3000

## Running Tests

### Backend Tests (Jest)
```bash
cd server
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Generate coverage report
```

**Test Files (5 files):**
- `colorUtils.test.ts` - HEX validation & color name conversion
- `promptBuilder.test.ts` - Prompt engineering with all 5 styles
- `stylePresets.test.ts` - Style data validation
- `replicateService.test.ts` - API service validation
- `server.test.ts` - Route validation logic

### Frontend Tests (Vitest)
```bash
cd client
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Generate coverage report
```

**Test Files (8 files):**
- `App.test.tsx` - Main app integration tests
- `components/PromptForm.test.tsx` - Form input validation
- `components/StyleSelector.test.tsx` - Style selection
- `components/ColorPicker.test.tsx` - Color management
- `components/FormatSelector.test.tsx` - Format/quality selection
- `components/IconGrid.test.tsx` - Icon display & downloads
- `api/iconApi.test.ts` - API client with timeout handling
- `utils/imageProcessing.test.ts` - Image resizing validation
- `utils/download.test.ts` - Download functionality

**Total: 13 comprehensive test files covering all critical functionality**

## Production Build

```bash
# Build backend
cd server
npm run build

# Build frontend
cd client
npm run build

# Preview production build
npm run preview
```

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`
3. Set environment variable:
   - `REPLICATE_API_TOKEN` in Vercel dashboard

### Option 2: Render

1. Push to GitHub
2. Connect repository to Render
3. Render will use `render.yaml` configuration
4. Set `REPLICATE_API_TOKEN` in Render dashboard

### Option 3: Docker

```bash
docker build -t icon-generator .
docker run -p 3001:3001 -e REPLICATE_API_TOKEN=your_token icon-generator
```

## Environment Variables

### Required

- `REPLICATE_API_TOKEN` - Replicate API token for Flux-Schnell model

### Optional

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### `GET /health`
Health check endpoint

### `POST /generate`
Generate 4 icons

**Request:**
```json
{
  "prompt": "Toys",
  "style": 2,
  "colors": ["#FF6B9D", "#4A90E2"],
  "outputFormat": "png",
  "outputQuality": 80
}
```

**Response:**
```json
{
  "success": true,
  "images": ["url1", "url2", "url3", "url4"],
  "format": "png"
}
```

## Key Features & Architecture

### Style Consistency System
- 5 predefined visual styles based on reference images
- Style-specific prompt templates ensure consistent output
- Each style has unique visual characteristics (outlines, backgrounds, decorative elements)

### Color Palette Integration
- Optional brand color support (up to 5 HEX colors)
- HEX-to-color-name conversion for natural language prompts
- Colors are integrated into AI prompts for palette steering

### Image Processing
- All images downscaled to exactly 512×512 pixels using HTML5 Canvas API
- Format conversion (PNG ↔ JPG) with quality control
- Individual and batch download functionality

### Error Handling & Reliability
- **Frontend**: 90-second timeout, validation, error states
- **Backend**: 60-second timeout, rate limiting (5 req/min), input validation
- Comprehensive error messages throughout

### Testing Coverage
- **Backend**: 5 test files covering services, utilities, validation
- **Frontend**: 8 test files covering components, API client, utilities
- Jest (backend) + Vitest (frontend) with React Testing Library

## Usage & Safety

This application uses the **Flux-Schnell AI model** from Black Forest Labs via Replicate. Please note:

### Model Characteristics
- Optimized for speed (4-step inference)
- Not intended for factual information
- May amplify existing societal biases
- Prompt following is heavily influenced by prompting style

### Prohibited Uses
The model and its derivatives may NOT be used for:
- Any illegal activities or content
- Exploiting, harming, or attempting to harm minors
- Generating verifiably false information to harm others
- Generating personal identifiable information to harm individuals
- Harassment, abuse, threats, stalking, or bullying
- Non-consensual nudity or illegal pornographic content
- Fully automated decision-making affecting legal rights
- Large-scale disinformation campaigns

See [Black Forest Labs Flux-Schnell](https://replicate.com/black-forest-labs/flux-schnell) for full license details.

## Cost Awareness

**Important**: All API calls to Replicate incur costs.

The app includes protective measures:
- **Rate limiting**: 5 requests per minute per IP
- **Request size limits**: 10KB max request body
- **Timeouts**: 60s backend, 90s frontend
- **Input validation**: Prevents invalid/wasteful requests

Be mindful when generating icons - each generation uses API credits.

## Known Limitations

- Generates 4 icons per request (API limitation)
- Generation time: 10-30 seconds depending on API load
- Rate limited to 5 requests per minute (cost protection)
- Requires active internet connection
- Style consistency depends on AI model interpretation

## License

MIT

## Project Structure

```
icon-style-generator/
├── client/                         # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/             # UI components (6 files)
│   │   │   ├── PromptForm.tsx      # User prompt input
│   │   │   ├── StyleSelector.tsx   # 5 style presets selector
│   │   │   ├── ColorPicker.tsx     # Optional brand color picker
│   │   │   ├── FormatSelector.tsx  # PNG/JPG format selector
│   │   │   ├── IconGrid.tsx        # 4-icon display grid
│   │   │   └── LoadingSpinner.tsx  # Loading state
│   │   ├── api/
│   │   │   └── iconApi.ts          # Backend API client
│   │   ├── utils/
│   │   │   ├── imageProcessing.ts  # 512×512 resize, format conversion
│   │   │   └── download.ts         # Download helpers
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript type definitions
│   │   ├── styles/
│   │   │   └── globals.css         # Global styles with CSS variables
│   │   ├── test/
│   │   │   └── setup.ts            # Vitest setup
│   │   ├── __tests__/              # Frontend tests (8 test files)
│   │   │   ├── App.test.tsx
│   │   │   ├── components/         # Component tests (5 files)
│   │   │   ├── api/                # API client tests
│   │   │   └── utils/              # Utility tests (2 files)
│   │   ├── App.tsx                 # Main application
│   │   └── main.tsx                # Entry point
│   ├── dist/                       # Production build (generated)
│   ├── package.json
│   ├── vite.config.ts              # Vite configuration with proxy
│   └── vitest.config.ts            # Vitest test configuration
├── server/                         # Node.js backend (Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts              # Environment variable loader
│   │   ├── services/
│   │   │   ├── promptBuilder.ts    # Prompt engineering service
│   │   │   └── replicateService.ts # Replicate API integration
│   │   ├── utils/
│   │   │   └── colorUtils.ts       # HEX to color name conversion
│   │   ├── __tests__/              # Backend tests (5 test files)
│   │   │   ├── promptBuilder.test.ts
│   │   │   ├── stylePresets.test.ts
│   │   │   ├── colorUtils.test.ts
│   │   │   ├── replicateService.test.ts
│   │   │   └── server.test.ts
│   │   ├── stylePresets.ts         # 5 visual style definitions
│   │   └── server.ts               # Express server + routes
│   ├── dist/                       # Compiled JavaScript (generated)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.test.json          # Test-specific TypeScript config
│   └── jest.config.js              # Jest test configuration
├── vercel.json                     # Vercel deployment config
├── render.yaml                     # Render deployment config
├── Dockerfile                      # Docker deployment config
└── README.md
```
