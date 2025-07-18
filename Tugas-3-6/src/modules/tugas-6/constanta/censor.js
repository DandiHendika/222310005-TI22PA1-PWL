// Daftar kata-kata yang ingin disensor
const BAD_WORDS = ['fuck', 'damn', 'bitch', 'hell', 'luka', 'benci', 'starving'];

/**
 * Fungsi untuk menyensor kata-kata negatif dalam sebuah teks.
 * @param {string} text - Teks input yang akan disensor.
 * @returns {string} - Teks yang sudah disensor.
 */
export const censorText = (text) => {
  if (!text || typeof text !== 'string') {
    return "";
  }

  const regex = new RegExp(BAD_WORDS.join('|'), 'gi');

  return text.replace(regex, (matchedWord) => '*'.repeat(matchedWord.length));
};