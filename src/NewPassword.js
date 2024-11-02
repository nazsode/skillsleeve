import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/new-password', { token, newPassword });
            alert("Şifreniz başarıyla sıfırlandı!");
            navigate('/login');
        } catch (err) {
            console.error("Şifre sıfırlama hatası:", err);
            setError('Şifre sıfırlama başarısız. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="max-w-lg w-full bg-white border-4 border-customBlue rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Yeni Şifreyi Belirle</h2>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Yeni Şifre</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Şifre Tekrar</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Şifreyi Sıfırla
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
