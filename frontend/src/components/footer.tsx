import Link from "next/link";
import { BarChart2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-1 rounded-md">
                <BarChart2 className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-foreground">ABSA IndoBERT</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Proyek akhir Aspect-Based Sentiment Analysis pada ulasan aplikasi e-commerce Indonesia menggunakan model IndoBERT.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tautan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/analisis" className="hover:text-primary transition-colors">Analisis Sentimen</Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Penelitian</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Tim Peneliti</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Kelompok 08</li>
              <li>Universitas Syiah Kuala</li>
              <li>Mata Kuliah Natural Language Processing</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ABSA IndoBERT Project. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>Dibuat dengan Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
