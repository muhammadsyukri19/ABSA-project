import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  confidence: number; // 0 to 1
  className?: string;
}

export default function ConfidenceBar({ confidence, className }: ConfidenceBarProps) {
  const percentage = Math.round(confidence * 100);
  
  // Color logic based on confidence level
  const getColor = (val: number) => {
    if (val >= 0.8) return "bg-green-500";
    if (val >= 0.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const colorClass = getColor(confidence);

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <span className="text-xs font-medium text-muted-foreground w-12 text-right">
        {percentage}%
      </span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className={cn("h-full rounded-full", colorClass)}
        />
      </div>
    </div>
  );
}
