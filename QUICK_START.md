# GlycoCare+ Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Add Your API Keys

Open `.env` file and replace the placeholder values:

```env
# Already configured - DO NOT CHANGE
VITE_SUPABASE_URL=https://zhrdjeutouiljjftumsk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ADD YOUR API KEYS HERE
HUGGINGFACE_TOKEN=hf_YOUR_ACTUAL_TOKEN_HERE
GROQ_API_KEY=gsk_YOUR_ACTUAL_KEY_HERE
```

**Get Your API Keys:**
- **Hugging Face**: https://huggingface.co/settings/tokens
- **Groq**: https://console.groq.com/keys

### Step 2: Start the Application

```bash
npm run dev
```

The app will start at `http://localhost:8080`

### Step 3: Create Your Account

1. Navigate to `http://localhost:8080`
2. Click "Get Started" or "Sign up"
3. Fill in your details:
   - Full name
   - Email address
   - Password
   - Age and weight
   - Health conditions (optional)
4. Click "Create Account"
5. You'll be redirected to your dashboard

---

## 🎯 Try These Features

### 1. Analyze a Meal

**Path**: `/analyze`

1. Enter your current vitals (glucose, BP, heart rate)
2. Upload a photo of your meal
3. Click "Analyze"
4. View AI-powered results:
   - Identified dish
   - Portion size estimate
   - Predicted glucose impact
   - Personalized health advice
   - Food swap suggestions
5. Click "Save Meal" to store in your history

### 2. Chat with AI Health Coach

**Path**: `/chat`

1. Ask health-related questions:
   - "What should I eat for dinner?"
   - "How can I lower my glucose?"
   - "Is chicken biryani okay for me?"
2. Get personalized AI responses
3. View conversation history

**Example Questions:**
- "Suggest a low-GI dinner"
- "How to reduce BP after a heavy meal?"
- "Is this meal safe for my glucose levels?"

### 3. View Your Dashboard

**Path**: `/dashboard`

See your health overview:
- Current vitals (glucose, BP, heart rate)
- Latest meal impact
- 7-day glucose trends
- Blood pressure variation
- Meal health distribution
- Quick action buttons

### 4. Get Your Meal Plan

**Path**: `/planner`

1. View AI-generated 7-day meal plan
2. Personalized based on your health profile
3. Click "Regenerate Plan" for variety
4. Export plan as PDF (coming soon)

### 5. Manage Your Profile

**Path**: `/profile`

1. Update personal information
2. Log new vitals
3. View recent meals
4. Update health conditions

---

## 🎨 Page Navigation

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with features |
| Sign Up | `/signup` | Create new account |
| Login | `/login` | Sign in to account |
| Dashboard | `/dashboard` | Health overview |
| Meal Analyzer | `/analyze` | Upload and analyze meals |
| AI Chat | `/chat` | Health coaching |
| Meal Planner | `/planner` | 7-day meal plans |
| Profile | `/profile` | Manage your profile |

---

## 📱 Mobile Navigation

On mobile devices, use the bottom navigation bar to switch between:
- 🏠 Dashboard
- 📸 Analyze
- 📅 Planner
- 💬 Chat
- 👤 Profile

---

## 💡 Tips for Best Results

### For Meal Analysis
1. Take clear, well-lit photos of your meals
2. Include the entire dish in the frame
3. Update your vitals before analyzing
4. Save analyzed meals to track patterns

### For AI Chat
1. Be specific in your questions
2. Mention your current vitals if relevant
3. Ask follow-up questions for clarity
4. Review chat history for past advice

### For Dashboard
1. Log vitals regularly for accurate trends
2. Analyze meals consistently
3. Check your dashboard daily
4. Review weekly summaries

---

## 🔍 What the AI Can Do

### Food Classification
- Identifies 100+ common dishes
- Works with various cuisines
- Estimates confidence level
- Handles complex meals

### Glucose Prediction
- Predicts blood glucose impact
- Considers your health profile
- Accounts for portion sizes
- Provides risk assessment

### Health Coaching
- Personalized diet advice
- Glucose management tips
- Blood pressure guidance
- Exercise recommendations
- Food substitution ideas

---

## 📊 Understanding Your Results

### Meal Status Colors

**🟢 Normal (Green)**
- Safe glucose impact
- Good food choice
- Maintain portion size

**🟡 Borderline (Yellow)**
- Moderate glucose impact
- Eat with caution
- Consider smaller portion
- Walk after eating

**🔴 High Risk (Red)**
- Significant glucose spike
- Not recommended
- Choose alternative
- Consult healthcare provider

### Glucose Delta

The predicted change in blood glucose (mg/dL):
- **< 10**: Minimal impact
- **10-20**: Moderate impact
- **20-40**: Significant impact
- **> 40**: High impact

---

## 🛠️ Troubleshooting

### "Analysis Failed"
- Check your API keys in `.env`
- Verify internet connection
- Try a different image
- Check console for errors

### "Authentication Error"
- Clear browser cache
- Try logging out and back in
- Check if email is verified
- Contact support if persists

### "No Data Available"
- Log some vitals first
- Analyze at least one meal
- Data may take a moment to load
- Refresh the page

---

## 🔐 Privacy & Security

### Your Data is Protected
- Row-level security on all tables
- Only you can access your data
- Passwords securely hashed
- JWT token authentication

### What We Store
- User profile information
- Health vital measurements
- Meal analysis history
- Chat conversations

### What We Don't Store
- Payment information (no payments)
- Meal photos (processed, not stored)
- Sensitive medical records
- Third-party credentials

---

## 📞 Need Help?

### Documentation
- **BACKEND_SETUP.md** - Complete technical docs
- **API_ENDPOINTS.md** - API reference
- **IMPLEMENTATION_SUMMARY.md** - Overview

### Common Issues
1. **Build errors**: Run `npm install` again
2. **API errors**: Check your API keys
3. **Auth issues**: Clear browser data
4. **Database errors**: Check Supabase status

### External Resources
- Supabase Docs: https://supabase.com/docs
- Hugging Face: https://huggingface.co/docs
- Groq: https://console.groq.com/docs

---

## 🎉 You're All Set!

Your GlycoCare+ application is ready to use. Start by:

1. ✅ Adding your API keys to `.env`
2. ✅ Running `npm run dev`
3. ✅ Creating your account at `/signup`
4. ✅ Analyzing your first meal
5. ✅ Chatting with the AI health coach

**Enjoy managing your health smarter with AI!** 🚀
