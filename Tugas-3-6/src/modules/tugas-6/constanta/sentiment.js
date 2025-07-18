// src/widgets/constanta/sentiment.js

import Sentiment from 'sentiment';

// Buat instance baru dari library sentiment
const sentiment = new Sentiment();

/**
 * Fungsi baru untuk mendapatkan status sentimen menggunakan library.
 * @param {string} text - Pesan yang akan dianalisis.
 * @returns {'Positive' | 'Negative' | 'Neutral'}
 */
export const getSentiment = (text) => {
  if (!text || typeof text !== 'string') {
    return 'Neutral';
  }

  // Gunakan library untuk menganalisis teks.
  // Hasilnya adalah objek, contoh: { score: 2, comparative: 0.5, ... }
  const result = sentiment.analyze(text);

  // Ubah 'score' dari library menjadi status sentimen kita.
  // Score > 0  -> Positif
  // Score < 0  -> Negatif
  // Score = 0  -> Netral
  if (result.score > 0) {
    return 'Positive';
  } else if (result.score < 0) {
    return 'Negative';
  } else {
    return 'Neutral';
  }
};