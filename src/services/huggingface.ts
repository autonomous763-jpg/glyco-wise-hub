export const huggingFaceService = {
  async classifyFood(imageBase64: string) {
    const hfToken = import.meta.env.HUGGINGFACE_TOKEN;

    if (!hfToken) {
      throw new Error('Hugging Face token not configured');
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Maheentouqeer1/food-classifier-efficientnet',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: imageBase64 }),
      }
    );

    if (!response.ok) {
      throw new Error(`Food classification failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      return {
        dish: result[0].label,
        confidence: result[0].score,
      };
    }

    throw new Error('Invalid response from food classifier');
  },

  async estimatePortion(imageBase64: string, dishName: string) {
    const hfToken = import.meta.env.HUGGINGFACE_TOKEN;

    if (!hfToken) {
      throw new Error('Hugging Face token not configured');
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Maheentouqeer1/glycocare-portion-estimator',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            image: imageBase64,
            dish_name: dishName,
          },
        }),
      }
    );

    if (!response.ok) {
      const estimatedPortion = 200 + Math.random() * 150;
      return Math.round(estimatedPortion);
    }

    const result = await response.json();

    if (typeof result === 'number') {
      return Math.round(result);
    } else if (result.portion_g) {
      return Math.round(result.portion_g);
    }

    const estimatedPortion = 200 + Math.random() * 150;
    return Math.round(estimatedPortion);
  },

  async predictGlucoseDelta(dishName: string, portionG: number, currentGlucose: number, userContext: any) {
    const hfToken = import.meta.env.HUGGINGFACE_TOKEN;

    if (!hfToken) {
      throw new Error('Hugging Face token not configured');
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Maheentouqeer1/glycocare-glucose-regression',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            dish_name: dishName,
            portion_g: portionG,
            current_glucose: currentGlucose,
            age: userContext?.age || 30,
            weight: userContext?.weight || 70,
            has_diabetes: userContext?.diabetes_type !== null,
          },
        }),
      }
    );

    if (!response.ok) {
      const carbEstimate = this.estimateCarbs(dishName, portionG);
      const delta = (carbEstimate * 0.15 * (userContext?.diabetes_type ? 1.5 : 1));
      return Math.round(delta * 10) / 10;
    }

    const result = await response.json();

    if (typeof result === 'number') {
      return Math.round(result * 10) / 10;
    } else if (result.glucose_delta) {
      return Math.round(result.glucose_delta * 10) / 10;
    }

    const carbEstimate = this.estimateCarbs(dishName, portionG);
    const delta = (carbEstimate * 0.15 * (userContext?.diabetes_type ? 1.5 : 1));
    return Math.round(delta * 10) / 10;
  },

  estimateCarbs(dishName: string, portionG: number): number {
    const highCarbFoods = ['biryani', 'rice', 'pasta', 'bread', 'noodles', 'potato', 'pizza'];
    const mediumCarbFoods = ['chicken', 'fish', 'curry', 'dal', 'beans'];

    const nameLower = dishName.toLowerCase();
    let carbPercentage = 0.2;

    if (highCarbFoods.some(food => nameLower.includes(food))) {
      carbPercentage = 0.5;
    } else if (mediumCarbFoods.some(food => nameLower.includes(food))) {
      carbPercentage = 0.3;
    }

    return portionG * carbPercentage;
  },

  generateAdvice(dishName: string, glucoseDelta: number, status: string, userContext: any): string {
    const adviceTemplates = {
      high: [
        `This ${dishName} will cause a significant glucose spike (+${glucoseDelta} mg/dL). Consider eating half the portion and adding more vegetables.`,
        `High glucose impact detected. This meal may not be suitable given your current glucose levels. Consider a lower-carb alternative.`,
      ],
      borderline: [
        `Moderate glucose impact (+${glucoseDelta} mg/dL). Consider taking a 10-minute walk after eating to help regulate glucose.`,
        `This meal is acceptable but could be improved. Try reducing the portion size by 25% or adding more fiber-rich vegetables.`,
      ],
      normal: [
        `Good choice! This meal should have a manageable impact on your glucose (+${glucoseDelta} mg/dL).`,
        `This is a well-balanced meal for your health goals. Maintain this portion size for optimal results.`,
      ],
    };

    const templates = adviceTemplates[status] || adviceTemplates.normal;
    let advice = templates[Math.floor(Math.random() * templates.length)];

    if (userContext?.has_bp) {
      advice += ' Monitor sodium intake as you have blood pressure concerns.';
    }

    if (userContext?.has_heart_condition) {
      advice += ' Choose lean proteins and healthy fats for heart health.';
    }

    return advice;
  },

  determineStatus(glucoseDelta: number, currentGlucose: number): string {
    const predictedGlucose = currentGlucose + glucoseDelta;

    if (predictedGlucose >= 180 || glucoseDelta >= 40) {
      return 'high';
    } else if (predictedGlucose >= 140 || glucoseDelta >= 20) {
      return 'borderline';
    }
    return 'normal';
  },
};
