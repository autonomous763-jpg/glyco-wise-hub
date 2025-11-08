// Mock API functions for GlycoCare+
// TODO: Replace with real backend endpoints

export interface DashboardData {
  glucose: number;
  systolic: number;
  diastolic: number;
  heartRate: number;
  latestMeal?: {
    dish: string;
    portion: number;
    glucoseDelta: number;
    timestamp: string;
  };
}

export interface AnalyzeResult {
  dish: string;
  portion: number;
  predictedDelta: number;
  confidence: number;
  advice: string;
  status: "normal" | "borderline" | "high";
  tips: string[];
  foodSwaps: string[];
}

export interface MealPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Mock Dashboard API
export const fetchDashboard = async (userId: string): Promise<DashboardData> => {
  // TODO: Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    glucose: 145,
    systolic: 138,
    diastolic: 88,
    heartRate: 92,
    latestMeal: {
      dish: "Chicken Biryani",
      portion: 250,
      glucoseDelta: 14.6,
      timestamp: new Date().toISOString(),
    },
  };
};

// Mock Analyze API
export const analyzeMeal = async (image: File, vitals: any): Promise<AnalyzeResult> => {
  // TODO: Replace with actual API call to /api/analyze
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  return {
    dish: "Chicken Biryani",
    portion: 250,
    predictedDelta: 14.6,
    confidence: 89,
    advice: "Your glucose is moderately elevated and BP slightly high. This meal is high in carbs and sodium. Consider brown rice next time and reduce salt. Take a 10-minute walk after eating to help regulate glucose.",
    status: "borderline",
    tips: [
      "Take a 10-minute walk after eating",
      "Drink plenty of water",
      "Monitor glucose after 2 hours",
    ],
    foodSwaps: [
      "Replace white rice with brown rice",
      "Use less oil and salt",
      "Add more vegetables",
    ],
  };
};

// Mock Save Meal API
export const saveMeal = async (mealData: any): Promise<boolean> => {
  // TODO: Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Store in localStorage for now
  const meals = JSON.parse(localStorage.getItem("glycocare_meals") || "[]");
  meals.push({ ...mealData, timestamp: new Date().toISOString() });
  localStorage.setItem("glycocare_meals", JSON.stringify(meals));
  
  return true;
};

// Mock Meal Planner API
export const fetchMealPlan = async (): Promise<MealPlan[]> => {
  // TODO: Replace with actual API call to /api/plan
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return days.map((day) => ({
    day,
    breakfast: "Oatmeal with berries and nuts",
    lunch: "Grilled chicken salad with olive oil",
    dinner: "Baked salmon with steamed vegetables",
  }));
};

// Mock Regenerate Plan API
export const regenerateMealPlan = async (): Promise<MealPlan[]> => {
  // TODO: Replace with actual API call
  return fetchMealPlan();
};

// Mock Chat API
export const sendChatMessage = async (message: string, history: ChatMessage[]): Promise<string> => {
  // TODO: Replace with actual API call to /api/chat
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const responses = {
    "low-gi": "Try grilled fish with brown rice and steamed vegetables. Add a side of lentils for extra fiber.",
    "reduce bp": "Take a 10-minute walk, drink water, and avoid salty foods for the next few hours.",
    default: "I'm here to help with your nutrition and health questions. Try asking about meal suggestions or health tips!",
  };
  
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("low-gi") || lowerMsg.includes("dinner")) {
    return responses["low-gi"];
  } else if (lowerMsg.includes("bp") || lowerMsg.includes("blood pressure")) {
    return responses["reduce bp"];
  }
  
  return responses.default;
};
