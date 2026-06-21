export type SentimentType = "positif" | "negatif" | "netral";

export interface AspectPrediction {
  aspect: string;
  sentiment: SentimentType;
  confidence: number;
  processed_text: string;
}

export interface ModelResult {
  inference_time_ms: number;
  predictions: AspectPrediction[];
}

export interface PredictionResponse {
  original_text: string;
  base_model: ModelResult;
  large_model: ModelResult;
}

export interface PredictionRequest {
  text: string;
}

export interface AspectDefinition {
  id: string;
  name: string;
  description: string;
  color: string;
}
