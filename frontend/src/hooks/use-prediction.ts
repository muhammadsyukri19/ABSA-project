import { useState } from "react";
import { PredictionResponse } from "@/lib/types";
import { predictSentiment } from "@/lib/api";

export function usePrediction() {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await predictSentiment(text);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    predict,
    reset,
  };
}
