import React, { useState } from 'react';
import axios from 'axios';

const SendResetLink = () => {
    const [email, setEmail] = useState('');

    const handleSendResetLink = async (e) => {
        e.preventDefault();
        // Basit e-posta doğrulama
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Geçersiz e-posta formatı.");
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/send-reset-link', { email });
            alert("Şifre sıfırlama bağlantısı e-postanıza gönderildi.");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Bu e-posta kayıtlı değil.");
            } else {
                console.error("Hata oluştu:", error);
                alert("Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto p-6 border-4 border-customBlue rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-6">Şifremi Sıfırla</h2>
                <form onSubmit={handleSendResetLink} className="flex flex-col items-center">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-left">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-customBlue text-white rounded hover:bg-blue-600">
                        Şifre Sıfırlama Linki Gönder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendResetLink;
