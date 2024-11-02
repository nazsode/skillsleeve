import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Her giriş denemesinde hata mesajını sıfırla
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { userType } = response.data;

            // Şirket kullanıcılarını yönlendirme
            if (userType === 'Şirket') {
                navigate('/company-home');
            } else {
                console.error("Unknown user type");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("Şifre hatalı");
            } else {
                console.error("Giriş hatası:", error);
                setErrorMessage("Giriş sırasında bir hata oluştu.");
            }
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToResetPassword = () => {
        navigate('/send-reset-link');
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full mx-auto p-6 border-4 border-customBlue rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-6">Giriş Yap</h2>
                {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
                <form onSubmit={handleLogin} className="flex flex-col items-center">
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
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-left">Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-customBlue text-white rounded hover:bg-blue-600">
                        Giriş Yap
                    </button>
                </form>
                <p className="mt-4 text-gray-700">
                    Hesabın yok mu?{' '}
                    <span 
                        onClick={navigateToRegister} 
                        className="text-customBlue cursor-pointer hover:underline"
                    >
                        Kaydol
                    </span>
                </p>
                <p className="mt-2 text-gray-700">
                    <span 
                        onClick={navigateToResetPassword} 
                        className="text-customBlue cursor-pointer hover:underline"
                    >
                        Şifremi unuttum
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
