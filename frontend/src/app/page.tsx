"use client";

import Hero from "@/components/hero";
import SectionHeading from "@/components/section-heading";
import FeatureCard from "@/components/feature-card";
import { ASPECTS } from "@/lib/constants";
import { Search, Brain, BarChart3, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Fitur Analisis Utama" 
            subtitle="Platform kami dilengkapi dengan kapabilitas analisis mutakhir menggunakan model IndoBERT yang telah disesuaikan."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Search}
              title="Analisis Multi-Aspek"
              description="Mengidentifikasi 5 aspek kritis dari ulasan secara bersamaan dalam satu kalimat."
              delay={0.1}
            />
            <FeatureCard 
              icon={Brain}
              title="IndoBERT Fine-tuned"
              description="Memanfaatkan kekuatan model bahasa terdepan untuk bahasa Indonesia informal."
              delay={0.2}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Confidence Score"
              description="Dilengkapi skor probabilitas untuk memberikan tingkat kepastian prediksi model."
              delay={0.3}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Akurasi Tinggi"
              description="Model telah dievaluasi dengan dataset riil ulasan e-commerce (Tokopedia, Shopee, Blibli)."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Aspects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="5 Aspek Analisis Utama" 
            subtitle="Model kami dilatih secara khusus untuk mendeteksi sentimen pada lima kategori aspek berikut dari ulasan pengguna."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ASPECTS.map((aspect, index) => (
              <Card key={aspect.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${aspect.color}`} />
                    <h3 className="font-semibold text-lg">{aspect.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm flex-1">
                    {aspect.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
