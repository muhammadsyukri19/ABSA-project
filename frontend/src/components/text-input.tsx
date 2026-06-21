"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EXAMPLE_REVIEWS } from "@/lib/constants";
import { Send, Loader2 } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function TextInput({ value, onChange, onSubmit, isLoading }: TextInputProps) {
  const maxLength = 500;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="relative">
        <Textarea
          placeholder="Masukkan ulasan aplikasi e-commerce di sini..."
          className="min-h-[150px] resize-none text-base p-4 pr-4 bg-background border-border focus-visible:ring-primary shadow-sm rounded-xl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-1 rounded-md">
          {value.length}/{maxLength}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground py-1">Coba contoh:</span>
          {EXAMPLE_REVIEWS.slice(0, 2).map((example, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => onChange(example)}
              className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors border border-border/50 truncate max-w-[200px]"
              title={example}
            >
              "{example.substring(0, 30)}..."
            </button>
          ))}
        </div>

        <Button 
          onClick={onSubmit} 
          disabled={!value.trim() || isLoading}
          size="lg"
          className="w-full sm:w-auto gap-2 rounded-full px-8 shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              Analisis Sentimen <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
