"use client";

import { motion } from "framer-motion";
import { AspectPrediction, SentimentType } from "@/lib/types";
import { ASPECTS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ConfidenceBar from "./confidence-bar";
import { CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";

interface ResultCardProps {
  prediction: AspectPrediction;
  delay?: number;
}

export default function ResultCard({ prediction, delay = 0 }: ResultCardProps) {
  const aspectInfo = ASPECTS.find((a) => a.id === prediction.aspect) || {
    name: prediction.aspect,
    color: "bg-primary",
  };

  const getSentimentConfig = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positif":
        return { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2, label: "Positif" };
      case "negatif":
        return { color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle, label: "Negatif" };
      case "netral":
      default:
        return { color: "bg-gray-100 text-gray-700 border-gray-200", icon: MinusCircle, label: "Netral" };
    }
  };

  const sentimentConfig = getSentimentConfig(prediction.sentiment);
  const SentimentIcon = sentimentConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${aspectInfo.color} shadow-sm`}>
                <span className="text-xs font-bold">{aspectInfo.name.charAt(0)}</span>
              </div>
              <h4 className="font-semibold text-foreground">{aspectInfo.name}</h4>
            </div>
            
            <Badge variant="outline" className={`gap-1.5 px-2.5 py-1 ${sentimentConfig.color}`}>
              <SentimentIcon className="w-3.5 h-3.5" />
              {sentimentConfig.label}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-3 text-sm text-foreground/90 border border-border/30">
              <span className="text-xs font-medium text-muted-foreground block mb-1">Teks Diproses:</span>
              "{prediction.processed_text}"
            </div>
            
            <div>
              <span className="text-xs font-medium text-muted-foreground block mb-1.5">Confidence Score:</span>
              <ConfidenceBar confidence={prediction.confidence} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
