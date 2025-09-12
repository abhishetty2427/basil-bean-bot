# 🌿 Basil & Beans AI Chatbot ☕

An AI-powered chatbot for Basil & Beans cafe that helps customers discover personalized menu recommendations through QR code access.

## Features

- 📱 Mobile-optimized chat interface
- 🤖 AI-powered menu recommendations using OpenAI GPT-4 or Google Gemini
- 🍽️ Personalized suggestions based on dietary preferences, spice tolerance, and health goals
- 📊 Nutritional information and calorie tracking
- 🏷️ QR code generator for table placement
- 🎨 Beautiful, cafe-themed UI with smooth animations

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   # OR use Gemini instead:
   # GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Generate QR codes:**
   - Visit `http://localhost:3000/qr` to generate QR codes
   - Download and print for table placement

## Usage

### For Customers
1. Scan the QR code on your table
2. Chat with the AI host about your preferences
3. Get personalized menu recommendations
4. Place your order with cafe staff

### For Cafe Owners
1. Access `/qr` to generate and print QR codes
2. Place QR codes on tables with instructions
3. Monitor chat interactions (optional analytics can be added)

## API Endpoints

- `POST /api/chat` - OpenAI-powered chat endpoint
- `POST /api/chat-gemini` - Google Gemini alternative

## Menu Management

The menu is stored in `menu/menu.json` with detailed information including:
- Nutritional data (calories, protein, carbs, fat)
- Allergen information
- Dietary labels (vegan, vegetarian)
- Spice levels (0-3)
- Ingredients and descriptions

## Customization

### Changing AI Provider
To use Gemini instead of OpenAI, update the fetch URL in `pages/index.js`:
```javascript
const res = await fetch("/api/chat-gemini", {
```

### Updating Menu
Edit `menu/menu.json` to reflect your current offerings. The AI will automatically use the updated menu data.

### Styling
The project uses Tailwind CSS with custom colors for the Basil & Beans theme. Modify `tailwind.config.js` to change the color scheme.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
This is a standard Next.js app and can be deployed to any platform supporting Node.js.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes (if using OpenAI) |
| `GEMINI_API_KEY` | Google Gemini API key | Yes (if using Gemini) |

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4 / Google Gemini
- **QR Codes:** qrcode library
- **Deployment:** Vercel-ready

## Support

For issues or questions about this chatbot implementation, please check the code comments or create an issue in your repository.

---

Built with ❤️ for Basil & Beans Cafe