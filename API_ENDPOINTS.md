# GlycoCare+ API Endpoints Summary

## Authentication Endpoints

### Sign Up
**Function**: `authService.signUp(email, password, userData)`
**Description**: Create new user account with profile information
**Request**:
```typescript
{
  email: string,
  password: string,
  userData: {
    name: string,
    age?: number,
    weight?: number,
    diabetes_type?: string,
    has_bp?: boolean,
    has_heart_condition?: boolean
  }
}
```
**Response**: User object with auth session

### Sign In
**Function**: `authService.signIn(email, password)`
**Description**: Authenticate existing user
**Request**:
```typescript
{
  email: string,
  password: string
}
```
**Response**: User object with auth session

### Get Current User
**Function**: `authService.getCurrentUser()`
**Description**: Retrieve authenticated user's profile
**Response**:
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 29,
  "weight": 68,
  "diabetes_type": "type2",
  "has_bp": true,
  "has_heart_condition": false,
  "created_at": "2025-01-01T00:00:00Z"
}
```

## Vitals Endpoints

### Save Vitals
**Function**: `vitalsService.saveVitals(vitals)`
**Description**: Record new vital measurements
**Request**:
```typescript
{
  user_id: string,
  glucose_level: number,
  bp_systolic: number,
  bp_diastolic: number,
  heart_rate: number
}
```

### Get Latest Vitals
**Function**: `vitalsService.getLatestVitals(userId)`
**Description**: Retrieve most recent vital measurements
**Response**:
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "glucose_level": 145,
  "bp_systolic": 138,
  "bp_diastolic": 88,
  "heart_rate": 92,
  "timestamp": "2025-01-08T10:30:00Z"
}
```

### Get Vitals Summary
**Function**: `vitalsService.getVitalsSummary(userId, days)`
**Description**: Get statistical summary for date range
**Response**:
```json
{
  "avg_glucose": 132,
  "avg_bp_systolic": 125,
  "avg_bp_diastolic": 82,
  "avg_heart_rate": 78,
  "count": 14
}
```

## Meal Endpoints

### Analyze Meal
**Function**: `analyzeMeal(image, vitals)`
**Description**: Complete meal analysis pipeline
**Request**:
```typescript
{
  image: File,
  vitals: {
    glucose: string,
    systolic: string,
    diastolic: string,
    heartRate: string
  }
}
```
**Response**:
```json
{
  "dish": "chicken biryani",
  "portion": 250,
  "predictedDelta": 14.6,
  "confidence": 89,
  "advice": "Moderate glucose impact. Consider taking a 10-minute walk after eating.",
  "status": "borderline",
  "tips": [
    "Take a 10-minute walk after eating",
    "Drink water with your meal",
    "Monitor glucose after 2 hours"
  ],
  "foodSwaps": [
    "Replace white rice with brown rice or quinoa",
    "Add more vegetables to reduce rice portion"
  ]
}
```

### Save Meal
**Function**: `saveMeal(mealData)`
**Description**: Save analyzed meal to database
**Request**:
```typescript
{
  dish: string,
  portion: number,
  predictedDelta: number,
  confidence: number,
  advice: string,
  status: string,
  vitals?: {
    glucose: string,
    systolic: string,
    diastolic: string,
    heartRate: string
  }
}
```

### Get Meal History
**Function**: `mealsService.getMealHistory(userId, limit)`
**Description**: Retrieve user's meal history
**Response**:
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "dish_name": "grilled chicken salad",
    "portion_g": 200,
    "glucose_delta": 8.2,
    "confidence": 0.92,
    "advice": "Good choice! Maintain this portion size.",
    "status": "normal",
    "timestamp": "2025-01-08T12:30:00Z"
  }
]
```

### Get Meal Stats
**Function**: `mealsService.getMealStats(userId, days)`
**Description**: Get meal statistics for date range
**Response**:
```json
{
  "total_meals": 21,
  "avg_glucose_delta": 12.3,
  "healthy_meals_count": 15,
  "risky_meals_count": 6,
  "healthy_meals_ratio": 0.71
}
```

## Chat Endpoints

### Send Chat Message
**Function**: `sendChatMessage(message, history)`
**Description**: Send message to AI health coach
**Request**:
```typescript
{
  message: string,
  history: Array<{
    role: "user" | "assistant",
    content: string,
    timestamp: string
  }>
}
```
**Response**: AI-generated health advice (string)

**Example**:
```
User: "What should I eat for dinner?"
AI: "Based on your current glucose level of 145 mg/dL, I recommend grilled fish with brown rice and steamed vegetables. This will have minimal impact on your glucose levels."
```

### Get Chat History
**Function**: `chatService.getChatHistory(userId, limit)`
**Description**: Retrieve conversation history
**Response**:
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "role": "user",
    "message": "What should I eat for dinner?",
    "timestamp": "2025-01-08T18:30:00Z"
  },
  {
    "id": "uuid",
    "user_id": "uuid",
    "role": "assistant",
    "message": "Based on your current glucose...",
    "timestamp": "2025-01-08T18:30:05Z"
  }
]
```

## Meal Planner Endpoints

### Get Meal Plan
**Function**: `fetchMealPlan()`
**Description**: Generate personalized 7-day meal plan
**Response**:
```json
[
  {
    "day": "Monday",
    "breakfast": "Steel-cut oatmeal with berries and almonds",
    "lunch": "Grilled chicken salad with olive oil dressing",
    "dinner": "Baked salmon with asparagus and sweet potato"
  },
  {
    "day": "Tuesday",
    "breakfast": "Greek yogurt with chia seeds and walnuts",
    "lunch": "Lentil soup with mixed vegetables",
    "dinner": "Chicken stir-fry with lots of vegetables"
  }
]
```

### Regenerate Plan
**Function**: `regenerateMealPlan()`
**Description**: Generate new personalized meal plan
**Response**: Same format as Get Meal Plan

## Dashboard Endpoint

### Get Dashboard Data
**Function**: `fetchDashboard(userId)`
**Description**: Retrieve complete dashboard data
**Response**:
```json
{
  "glucose": 145,
  "systolic": 138,
  "diastolic": 88,
  "heartRate": 92,
  "latestMeal": {
    "dish": "chicken biryani",
    "portion": 250,
    "glucoseDelta": 14.6,
    "timestamp": "2025-01-08T12:30:00Z"
  }
}
```

## AI Service Endpoints

### Hugging Face - Food Classification
**Model**: `Maheentouqeer1/food-classifier-efficientnet`
**Function**: `huggingFaceService.classifyFood(imageBase64)`
**Response**:
```json
{
  "dish": "chicken biryani",
  "confidence": 0.89
}
```

### Hugging Face - Portion Estimation
**Model**: `Maheentouqeer1/glycocare-portion-estimator`
**Function**: `huggingFaceService.estimatePortion(imageBase64, dishName)`
**Response**: Portion size in grams (number)

### Hugging Face - Glucose Prediction
**Model**: `Maheentouqeer1/glycocare-glucose-regression`
**Function**: `huggingFaceService.predictGlucoseDelta(...)`
**Response**: Predicted glucose delta (number)

### Groq - AI Chat
**Model**: `llama-3.3-70b-versatile`
**Function**: `chatService.sendMessageToGroq(message, history, userContext)`
**Response**: AI-generated response (string)

## Status Codes

All endpoints follow standard conventions:
- **Success**: Returns data or confirmation
- **Error**: Throws exception with descriptive message
- **Authentication Required**: All endpoints require valid user session

## Rate Limits

- **Hugging Face**: Subject to API tier limits
- **Groq**: Check your API plan limits
- **Supabase**: Based on project plan

## Error Handling

All services include try-catch blocks with:
- Console error logging
- User-friendly error messages
- Graceful fallback behavior

## Example Usage

### Complete Meal Analysis Flow
```typescript
// 1. Upload image
const file = event.target.files[0];

// 2. Analyze meal
const result = await analyzeMeal(file, {
  glucose: "145",
  systolic: "138",
  diastolic: "88",
  heartRate: "92"
});

// 3. Display results
console.log(result.dish, result.predictedDelta, result.advice);

// 4. Save to database
await saveMeal({
  ...result,
  vitals: { glucose: "145", systolic: "138", diastolic: "88", heartRate: "92" }
});
```

### Chat with Context
```typescript
// Get chat history
const history = await chatService.getChatHistory(userId, 10);

// Send new message
const response = await sendChatMessage("What should I eat?", history);

// Display response
console.log(response);
```

## Notes

- All timestamps are in ISO 8601 format
- All endpoints require authentication except signup/signin
- Data is automatically filtered by user_id via RLS
- Responses include proper error messages for debugging
