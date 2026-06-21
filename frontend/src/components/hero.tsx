"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Database } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary-light/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              Proyek NLP Kelompok 08
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Analisis Sentimen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Berbasis Aspek</span> pada Ulasan E-Commerce
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Mengekstraksi wawasan mendalam dari ulasan pengguna aplikasi e-commerce Indonesia menggunakan model bahasa IndoBERT yang di-fine-tune untuk mendeteksi multi-aspek.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/analisis">
                <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  Coba Analisis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tentang">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8">
                  Pelajari Model
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Metrics/Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Bot, label: "Model", value: "IndoBERT" },
              { icon: Database, label: "Dataset", value: "E-Commerce Reviews" },
              { icon: Zap, label: "Aspek", value: "5 Kategori" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="p-3 bg-primary/10 text-primary rounded-xl mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</div>
                <div className="font-bold text-foreground text-lg">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
