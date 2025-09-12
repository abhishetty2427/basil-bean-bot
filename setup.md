# 🚀 Basil & Beans Chatbot - Quick Setup Guide

## ✅ What's Ready
Your AI chatbot is fully built and ready to deploy! Here's what you have:

### 📱 **Mobile-Optimized Chatbot**
- Beautiful, responsive design perfect for phones
- Smooth animations and loading states
- Auto-scrolling chat interface
- Green & amber theme matching "Basil & Beans"

### 🤖 **Smart AI Integration**
- OpenAI GPT-4 integration (primary)
- Google Gemini alternative (backup)
- Comprehensive menu knowledge
- Personalized recommendations based on:
  - Dietary preferences (veg/non-veg)
  - Spice tolerance
  - Health goals & calorie counting
  - Group size

### 📋 **Complete Menu System**
- 80+ menu items with full details
- Nutritional information (calories, macros)
- Allergen warnings
- Spice level indicators
- Price information in INR

### 🏷️ **QR Code Generator**
- Visit `/qr` to generate table QR codes
- Printable table cards
- Download PNG files
- Professional cafe branding

## 🔧 Next Steps

### 1. **Get Your API Key**
Choose one:
- **OpenAI**: Get key from https://platform.openai.com/api-keys
- **Google Gemini**: Get key from https://makersuite.google.com/app/apikey

### 2. **Set Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local

# Add your API key
echo "OPENAI_API_KEY=your_actual_key_here" > .env.local
```

### 3. **Test Locally**
```bash
# Start development server
npm run dev

# Test chatbot at: http://localhost:3000
# Generate QR codes at: http://localhost:3000/qr
```

### 4. **Deploy to Production**

#### Option A: Vercel (Recommended - Free)
1. Push code to GitHub
2. Connect to Vercel.com
3. Add your API key in Vercel environment variables
4. Deploy automatically

#### Option B: Other Platforms
- Railway, Netlify, or any Node.js hosting
- Just add your environment variables

### 5. **Print QR Codes**
1. Visit your deployed URL + `/qr`
2. Download or print the QR codes
3. Place on cafe tables with instructions:
   > "Scan to chat with our AI host for personalized menu recommendations!"

## 📊 **Features Your Customers Will Love**

- **"I want something spicy but not too heavy"** → Gets perfect recommendations
- **"We're 4 people, 2 vegetarian, want to share"** → Suggests shareable items
- **"I'm watching calories"** → Shows low-calorie options with exact numbers
- **"What goes well with Manchow soup?"** → Suggests complementary mains

## 🎯 **Ready to Go!**

Your chatbot is production-ready with:
- ✅ Error handling & fallbacks
- ✅ Mobile-first responsive design  
- ✅ Professional UI/UX
- ✅ Industry-standard code structure
- ✅ Security headers
- ✅ Performance optimizations

Just add your API key and deploy! 🚀

---

**Need help?** Check the README.md for detailed technical documentation.