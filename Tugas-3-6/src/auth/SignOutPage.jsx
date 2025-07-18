import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignOutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Hapus semua data dari localStorage
    localStorage.clear();

    // 2. Arahkan pengguna ke halaman login setelah 1 detik
    setTimeout(() => {
      // Menggunakan navigate dari React Router lebih disarankan
      navigate('/login');
      // Anda juga bisa memaksa refresh jika diperlukan
      // window.location.reload(); 
    }, 1000);
  }, [navigate]); // Jalankan efek ini sekali saat komponen dimuat

  // Tampilkan pesan sementara saat proses logout berjalan
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h2>Logging you out...</h2>
    </div>
  );
}