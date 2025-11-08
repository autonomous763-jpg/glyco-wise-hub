# GlycoCare+ Backend Integration Guide

## Overview

This document describes the complete backend implementation for GlycoCare+, a diabetes and cardiovascular health management application. The backend uses Supabase for authentication and database, with AI integrations via Hugging Face and Groq.

## Architecture

### Tech Stack
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (email/password)
- **Frontend**: React + TypeScript + Vite
- **AI Services**:
  - Hugging Face (food classification, portion estimation, glucose prediction)
  - Groq (conversational AI health coach)

## Database Schema

### Tables Created

#### 1. `users`
Stores user profile information linked to Supabase Auth.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | References auth.users(id) |
| name | text | User's full name |
| email | text | User's email address |
| age | integer | User's age |
| weight | float | User's weight in kg |
| gender | text | User's gender |
| diabetes_type | text | Type of diabetes (type2, type1, etc.) |
| has_bp | boolean | Blood pressure condition flag |
| has_heart_condition | boolean | Heart condition flag |
| created_at | timestamptz | Account creation timestamp |

#### 2. `vitals`
Stores health vital measurements.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique vital record ID |
| user_id | uuid (FK) | References users(id) |
| glucose_level | float | Blood glucose in mg/dL |
| bp_systolic | integer | Systolic blood pressure |
| bp_diastolic | integer | Diastolic blood pressure |
| heart_rate | integer | Heart rate in BPM |
| timestamp | timestamptz | Measurement timestamp |

#### 3. `meals`
Stores analyzed meal records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique meal record ID |
| user_id | uuid (FK) | References users(id) |
| dish_name | text | Identified dish name |
| portion_g | float | Portion size in grams |
| glucose_delta | float | Predicted glucose change |
| confidence | float | AI confidence score (0-1) |
| advice | text | Personalized health advice |
| status | text | Risk level (normal/borderline/high) |
| timestamp | timestamptz | Meal timestamp |

#### 4. `chat_history`
Stores AI chat conversations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Unique message ID |
| user_id | uuid (FK) | References users(id) |
| role | text | Message role (user/assistant) |
| message | text | Message content |
| timestamp | timestamptz | Message timestamp |

### Row-Level Security (RLS)

All tables have RLS enabled with policies ensuring users can only access their own data:
- SELECT: Users can view their own records
- INSERT: Users can create their own records
- UPDATE: Users can update their own records
- DELETE: Users can delete their own records

## Environment Variables

Add these to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# AI API Keys
HUGGINGFACE_TOKEN=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
```

## API Services

### Authentication Service (`src/services/auth.ts`)

**Methods:**
- `signUp(email, password, userData)` - Create new user account
- `signIn(email, password)` - Authenticate user
- `signOut()` - Log out user
- `getCurrentUser()` - Get authenticated user profile
- `updateProfile(userId, updates)` - Update user profile
- `onAuthStateChange(callback)` - Listen to auth state changes

### Vitals Service (`src/services/vitals.ts`)

**Methods:**
- `saveVitals(vitals)` - Save new vital measurements
- `getLatestVitals(userId)` - Get most recent vitals
- `getVitalsHistory(userId, days)` - Get vitals for date range
- `getVitalsSummary(userId, days)` - Get statistical summary

### Meals Service (`src/services/meals.ts`)

**Methods:**
- `saveMeal(meal)` - Save analyzed meal
- `getMealHistory(userId, limit)` - Get meal history
- `getMealsByDateRange(userId, days)` - Get meals for date range
- `getMealStats(userId, days)` - Get meal statistics
- `getLatestMeal(userId)` - Get most recent meal

### Chat Service (`src/services/chat.ts`)

**Methods:**
- `saveChatMessage(message)` - Save chat message
- `getChatHistory(userId, limit)` - Get chat history
- `clearChatHistory(userId)` - Clear all chat messages
- `sendMessageToGroq(message, history, userContext)` - Send message to AI

### Hugging Face Service (`src/services/huggingface.ts`)

**Methods:**
- `classifyFood(imageBase64)` - Identify food from image
- `estimatePortion(imageBase64, dishName)` - Estimate portion size
- `predictGlucoseDelta(dishName, portionG, currentGlucose, userContext)` - Predict glucose impact
- `generateAdvice(dishName, glucoseDelta, status, userContext)` - Generate health advice
- `determineStatus(glucoseDelta, currentGlucose)` - Calculate risk level

## API Integration Points

### Dashboard (`/dashboard`)
**Fetches:**
- Latest vitals from `vitalsService.getLatestVitals()`
- Latest meal from `mealsService.getLatestMeal()`
- 7-day statistics for charts

### Meal Analyzer (`/analyze`)
**Workflow:**
1. User uploads meal photo
2. Classify food using Hugging Face
3. Estimate portion size
4. Predict glucose delta
5. Generate personalized advice
6. Save to database

**Example Response:**
```json
{
  "dish": "chicken biryani",
  "portion": 250,
  "predictedDelta": 14.6,
  "confidence": 89,
  "advice": "Moderate glucose impact. Consider taking a 10-minute walk after eating.",
  "status": "borderline",
  "tips": ["Take a 10-minute walk after eating", "Drink water with your meal"],
  "foodSwaps": ["Replace white rice with brown rice", "Add more vegetables"]
}
```

### AI Chat (`/chat`)
**Features:**
- Conversational health advice using Groq LLaMA 3.3 70B
- Context-aware responses based on user profile and health data
- Chat history persistence in database

**Example Interaction:**
```
User: "What should I eat for dinner with my glucose at 145?"
AI: "Your glucose is moderately elevated. Try grilled fish with brown rice
     and steamed vegetables. Add a side of lentils for extra fiber."
```

### Meal Planner (`/planner`)
**Features:**
- 7-day personalized meal plan
- Based on user health profile and meal statistics
- Low-GI meal suggestions
- Regenerate feature for variety

### Profile (`/profile`)
**Features:**
- Update personal information
- Log current vitals
- View recent meal history
- Health condition tracking

## AI Model Integration

### Hugging Face Models

1. **Food Classifier**
   - Model: `Maheentouqeer1/food-classifier-efficientnet`
   - Purpose: Identify food items from images
   - Returns: Dish name and confidence score

2. **Portion Estimator**
   - Model: `Maheentouqeer1/glycocare-portion-estimator`
   - Purpose: Estimate portion size in grams
   - Input: Image + dish name
   - Returns: Portion weight

3. **Glucose Predictor**
   - Model: `Maheentouqeer1/glycocare-glucose-regression`
   - Purpose: Predict glucose impact
   - Input: Dish name, portion, current glucose, user profile
   - Returns: Predicted glucose delta

### Groq Chat API

- **Model**: `llama-3.3-70b-versatile`
- **Purpose**: Health coaching and nutrition advice
- **Context**: Includes user profile, recent vitals, and meal statistics
- **Parameters**: Temperature 0.7, Max tokens 500

## Security Features

1. **Row-Level Security (RLS)**
   - All database tables protected
   - Users can only access their own data
   - Automatic enforcement at database level

2. **Authentication**
   - Supabase Auth handles password hashing
   - JWT tokens for session management
   - Automatic token refresh

3. **API Keys**
   - Environment variables for sensitive keys
   - Never exposed to client
   - Server-side only access

## Error Handling

All services include comprehensive error handling:
- Network failures gracefully handled
- User-friendly error messages
- Fallback data when APIs unavailable
- Console logging for debugging

## Testing the Backend

### 1. Sign Up
```
Navigate to /signup
Fill in user details
Submit form
Should redirect to /dashboard
```

### 2. Upload Meal
```
Navigate to /analyze
Upload a food image
Enter current vitals
Submit for analysis
View results and save
```

### 3. Chat with AI
```
Navigate to /chat
Send a health-related question
Receive AI response
View chat history
```

### 4. View Dashboard
```
Navigate to /dashboard
See latest vitals
View meal history
Check health charts
```

## Database Queries Examples

### Get User's Meal History
```sql
SELECT * FROM meals
WHERE user_id = 'user-uuid'
ORDER BY timestamp DESC
LIMIT 10;
```

### Get Average Glucose Last 7 Days
```sql
SELECT AVG(glucose_level) as avg_glucose
FROM vitals
WHERE user_id = 'user-uuid'
AND timestamp >= NOW() - INTERVAL '7 days';
```

### Get Healthy Meals Ratio
```sql
SELECT
  COUNT(*) FILTER (WHERE status = 'normal') AS healthy,
  COUNT(*) FILTER (WHERE status = 'high') AS risky,
  COUNT(*) AS total
FROM meals
WHERE user_id = 'user-uuid';
```

## Future Enhancements

1. **Real-time Sync**
   - WebSocket connections for live updates
   - Push notifications for critical alerts

2. **Advanced Analytics**
   - ML-based pattern recognition
   - Predictive health trends
   - Personalized recommendations engine

3. **Integrations**
   - Wearable device connectivity
   - Apple Health / Google Fit sync
   - Healthcare provider portals

4. **Social Features**
   - Family sharing
   - Community meal suggestions
   - Dietitian consultations

## Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys in `.env`
- Check Supabase project status
- Ensure RLS policies are enabled

### AI API Errors
- Verify API keys are correct
- Check API rate limits
- Review model endpoint URLs

### Authentication Problems
- Clear browser cache and cookies
- Check Supabase Auth settings
- Verify email confirmation settings

## Support

For issues or questions:
1. Check Supabase dashboard for logs
2. Review browser console for errors
3. Verify all environment variables are set
4. Ensure database migrations ran successfully

## Summary

The GlycoCare+ backend is fully integrated with:
- ✅ Supabase database with 4 tables
- ✅ Row-level security enabled
- ✅ Email/password authentication
- ✅ Hugging Face AI models for food analysis
- ✅ Groq AI for health coaching
- ✅ Complete CRUD operations
- ✅ Error handling and validation
- ✅ Real-time auth state management
- ✅ Secure API key management

All frontend pages are connected to live backend services and ready for production use.
