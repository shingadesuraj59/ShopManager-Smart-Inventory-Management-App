import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl mt-4">Page Not Found</h2>
      <p className="text-lg mt-2">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
      >
        Go to DashBoard
    </button>
    </div>
  );
};

export default NotFoundPage;
