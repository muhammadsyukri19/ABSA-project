import { AspectDefinition } from "./types";

export const ASPECTS: AspectDefinition[] = [
  { id: "performa", name: "Performa & Bug", description: "Kecepatan, crash, lag, force close", color: "bg-blue-500" },
  { id: "transaksi", name: "Pembayaran & Transaksi", description: "Pembayaran, refund, error sistem pembayaran", color: "bg-green-500" },
  { id: "ui_ux", name: "UI/UX", description: "Tampilan, navigasi, kemudahan penggunaan", color: "bg-purple-500" },
  { id: "layanan_pelanggan", name: "Layanan Pelanggan", description: "Respons CS, komplain, penyelesaian masalah", color: "bg-orange-500" },
  { id: "fitur", name: "Fitur Aplikasi", description: "Kelengkapan fitur, update, notifikasi", color: "bg-teal-500" },
  { id: "pengiriman", name: "Pengiriman & Logistik", description: "Lama pengiriman, kurir, pelacakan paket", color: "bg-yellow-500" },
  { id: "produk", name: "Produk & Penjual", description: "Kualitas barang, respons seller", color: "bg-pink-500" },
  { id: "promosi", name: "Promosi & Voucher", description: "Promo, diskon, cashback, gratis ongkir", color: "bg-red-500" },
  { id: "lainnya", name: "Lainnya", description: "Hal-hal lain di luar kategori utama", color: "bg-slate-500" },
];

export const EXAMPLE_REVIEWS = [
  "Aplikasinya sangat lambat saat dibuka, apalagi pas mau checkout barang sering error.",
  "Tampilannya sekarang jauh lebih bagus dan gampang dipakai buat nyari barang.",
  "Kecewa banget sama CS nya, udah komplain dari kemarin tapi ngga ada respon sama sekali.",
  "Pembayaran pakai e-wallet lancar banget, ditambah dapet promo gratis ongkir mantap!",
];
