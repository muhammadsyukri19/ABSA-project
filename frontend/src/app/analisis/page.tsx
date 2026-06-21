"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrediction } from "@/hooks/use-prediction";
import SectionHeading from "@/components/section-heading";
import TextInput from "@/components/text-input";
import ResultCard from "@/components/result-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AnalisisPage() {
  const [text, setText] = useState("");
  const { data, isLoading, error, predict } = usePrediction();

  const handlePredict = () => {
    if (text.trim()) {
      predict(text);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading 
          title="Mulai Analisis Sentimen" 
          subtitle="Masukkan ulasan pengguna dari aplikasi e-commerce dan model IndoBERT kami akan mendeteksi sentimen berdasarkan aspek-aspek yang dibicarakan."
        />

        <div className="mb-16">
          <TextInput 
            value={text} 
            onChange={setText} 
            onSubmit={handlePredict} 
            isLoading={isLoading} 
          />
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <Alert variant="destructive" className="border-red-500/50 bg-red-50 text-red-900">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal memproses ulasan</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Menganalisis Ulasan...
            </h3>
            <LoadingSkeleton />
          </div>
        )}

        {/* Results State */}
        <AnimatePresence>
          {data && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <div className="flex items-end justify-between mb-8 pb-4 border-b border-border/50">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Perbandingan Model</h3>
                  <p className="text-muted-foreground text-sm">
                    Hasil analisis sentimen dari dua varian model IndoBERT.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Base Model Results */}
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                    <h4 className="font-bold text-lg text-primary flex items-center justify-between">
                      IndoBERT Base
                      <span className="text-xs font-medium bg-background px-2 py-1 rounded border text-muted-foreground">
                        {data.base_model.inference_time_ms.toFixed(1)} ms
                      </span>
                    </h4>
                  </div>
                  
                  {data.base_model.predictions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {data.base_model.predictions.map((prediction, idx) => (
                        <ResultCard 
                          key={`base-${prediction.aspect}-${idx}`} 
                          prediction={prediction} 
                          delay={idx * 0.15} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary/30 rounded-xl border border-border border-dashed">
                      <p className="text-muted-foreground">Tidak ada aspek terdeteksi.</p>
                    </div>
                  )}
                </div>

                {/* Large Model Results */}
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                    <h4 className="font-bold text-lg text-primary-light flex items-center justify-between">
                      IndoBERT Large
                      <span className="text-xs font-medium bg-background px-2 py-1 rounded border text-muted-foreground">
                        {data.large_model.inference_time_ms.toFixed(1)} ms
                      </span>
                    </h4>
                  </div>
                  
                  {data.large_model.predictions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {data.large_model.predictions.map((prediction, idx) => (
                        <ResultCard 
                          key={`large-${prediction.aspect}-${idx}`} 
                          prediction={prediction} 
                          delay={0.2 + (idx * 0.15)} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary/30 rounded-xl border border-border border-dashed">
                      <p className="text-muted-foreground">Tidak ada aspek terdeteksi.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
