import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-6">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="mb-6">
            <p className="flex items-center">
              Made with <FiHeart className="mx-1 text-red-400" /> by Store Team
            </p>
          </div>
          <div className="text-sm">
            <p>© {new Date().getFullYear()} Store Manager. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;