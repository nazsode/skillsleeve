import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Added username
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'Şirket', // Fixed user type for Company
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Kullanıcı adı gerekli'; // Validate username
    if (!formData.email) errors.email = 'Email gerekli';
    if (!formData.password) errors.password = 'Şifre gerekli';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      alert(response.data.message); // Başarılı kayıt mesajı
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      if (error.response?.data?.field === 'username') {
        setErrors({ username: 'Bu kullanıcı adı zaten kullanılıyor.' });
      } else if (error.response?.data?.field === 'email') {
        setErrors({ email: 'Bu email adresi zaten kullanılıyor.' });
      } else {
        setErrors({ general: error.response?.data.message || 'Kayıt başarısız. Lütfen tekrar deneyin.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 border-4 border-customBlue rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Şirket Kaydı</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Kullanıcı Adı:</label> {/* Username label */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Şifre:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Şifre (Tekrar):</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-customBlue text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Hesabın var mı?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-customBlue cursor-pointer hover:underline"
          >
            Giriş yap
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
