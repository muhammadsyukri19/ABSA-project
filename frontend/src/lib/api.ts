import axios from "axios";
import { PredictionRequest, PredictionResponse, SentimentType } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Mock function for development if backend is not ready
const mockPrediction = async (text: string): Promise<PredictionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isPositive = text.toLowerCase().includes("bagus") || text.toLowerCase().includes("lancar");
      const isNegative = text.toLowerCase().includes("lambat") || text.toLowerCase().includes("error") || text.toLowerCase().includes("kecewa");
      
      let sentiment: SentimentType = "netral";
      if (isPositive) sentiment = "positif";
      if (isNegative) sentiment = "negatif";

      const mockAspects = [];
      if (text.toLowerCase().includes("aplikasi") || text.toLowerCase().includes("lambat")) {
        mockAspects.push({ aspect: "performa", sentiment, confidence: 0.85 + Math.random() * 0.1, processed_text: text.substring(0, 50) });
      }
      if (text.toLowerCase().includes("bayar") || text.toLowerCase().includes("checkout")) {
        mockAspects.push({ aspect: "transaksi", sentiment, confidence: 0.7 + Math.random() * 0.2, processed_text: "bayar checkout" });
      }
      if (mockAspects.length === 0) {
        mockAspects.push({ aspect: "ui_ux", sentiment, confidence: 0.92, processed_text: text });
      }

      // Create slightly different mock results for large model
      const largeAspects = mockAspects.map(a => ({...a, confidence: Math.min(0.99, a.confidence + 0.05)}));

      resolve({
        original_text: text,
        base_model: {
          inference_time_ms: 120 + Math.random() * 30,
          predictions: mockAspects
        },
        large_model: {
          inference_time_ms: 280 + Math.random() * 50,
          predictions: largeAspects
        }
      });
    }, 1500);
  });
};

export async function predictSentiment(text: string): Promise<PredictionResponse> {
  // If API url is empty, use mock for development
  if (!API_BASE_URL) {
    console.log("Using mock API for prediction");
    return mockPrediction(text);
  }

  try {
    const payload: PredictionRequest = { text };
    const response = await axios.post<PredictionResponse>(`${API_BASE_URL}/api/predict`, payload);
    return response.data;
  } catch (error) {
    console.error("API Prediction Error:", error);
    throw new Error("Gagal terhubung ke server prediksi. Silakan coba lagi nanti.");
  }
}
