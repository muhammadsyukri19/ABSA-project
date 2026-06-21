import { AspectDefinition } from "./types";

export const ASPECTS: AspectDefinition[] = [
  {
    id: "performa",
    name: "Performa Aplikasi",
    description: "Kecepatan, crash, lag, force close",
    color: "bg-blue-500",
  },
  {
    id: "transaksi",
    name: "Transaksi",
    description: "Pembayaran, refund, promo, voucher",
    color: "bg-green-500",
  },
  {
    id: "ui_ux",
    name: "Antarmuka (UI/UX)",
    description: "Tampilan, navigasi, kemudahan penggunaan",
    color: "bg-purple-500",
  },
  {
    id: "layanan_pelanggan",
    name: "Layanan Pelanggan",
    description: "Respons CS, komplain, penyelesaian masalah",
    color: "bg-orange-500",
  },
  {
    id: "fitur",
    name: "Fitur Aplikasi",
    description: "Kelengkapan fitur, update, notifikasi",
    color: "bg-teal-500",
  },
];

export const EXAMPLE_REVIEWS = [
  "Aplikasinya sangat lambat saat dibuka, apalagi pas mau checkout barang sering error.",
  "Tampilannya sekarang jauh lebih bagus dan gampang dipakai buat nyari barang.",
  "Kecewa banget sama CS nya, udah komplain dari kemarin tapi ngga ada respon sama sekali.",
  "Pembayaran pakai e-wallet lancar banget, ditambah dapet promo gratis ongkir mantap!",
];
