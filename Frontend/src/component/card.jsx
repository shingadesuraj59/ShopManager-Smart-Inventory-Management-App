import { useNavigate } from "react-router-dom";
import React from 'react';

const Card = (props) => {
  const navigate = useNavigate();

  // Map titles to corresponding icons (using react-icons)
  const getIcon = () => {
    switch(props.title) {
      case 'Bill Generator':
        return <FiFileText className="w-10 h-10 mb-3 text-blue-500" />;
      case 'Add Products':
        return <FiPlusCircle className="w-10 h-10 mb-3 text-green-500" />;
      case 'Show Bills':
        return <FiDollarSign className="w-10 h-10 mb-3 text-purple-500" />;
      case 'Stock Analysis':
        return <FiBarChart2 className="w-10 h-10 mb-3 text-orange-500" />;
      case 'Shop Products':
        return <FiShoppingBag className="w-10 h-10 mb-3 text-red-500" />;
      case 'Customer Account':
        return <FiUser className="w-10 h-10 mb-3 text-indigo-500" />;
      case 'Supplier Data':
        return <FiTruck className="w-10 h-10 mb-3 text-teal-500" />;
      case 'Notes':
        return <FiGrid className="w-10 h-10 mb-3 text-yellow-500" />;
      default:
        return <FiGrid className="w-10 h-10 mb-3 text-gray-500" />;
    }
  };

  // Color gradients for different cards
  const getGradient = () => {
    switch(props.title) {
      case 'Bill Generator':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'Add Products':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'Show Bills':
        return 'bg-gradient-to-br from-purple-500 to-purple-600';
      case 'Stock Analysis':
        return 'bg-gradient-to-br from-orange-500 to-orange-600';
      case 'Shop Products':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'Customer Account':
        return 'bg-gradient-to-br from-indigo-500 to-indigo-600';
      case 'Supplier Data':
        return 'bg-gradient-to-br from-teal-500 to-teal-600';
      case 'Notes':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const handleCardClick = () => {
    const routes = {
      'Bill Generator': '/billgenerator',
      'Add Products': '/inventorymanager',
      'Show Bills': '/showbills',
      'Stock Analysis': '/stockanalysis',
      'Shop Products': '/productlist',
      'Customer Account': '/customeraccount',
      'Supplier Data': '/supplierData',
      'Notes': '/notes'
    };
    
    if (routes[props.title]) {
      navigate(routes[props.title]);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`${getGradient()} w-full max-w-[240px] h-[280px] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-white`}
    >
      <div className="flex justify-center items-center mb-4">
        {props.image ? (
          <img 
            src={props.image} 
            alt={props.title} 
            className="w-16 h-16 object-contain" 
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center">
            {getIcon()}
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-center mb-2">{props.title}</h3>
      <p className="text-sm text-center opacity-80 mb-4">{props.description || 'Click to explore'}</p>
      <div className="mt-auto w-full">
        <button className="w-full py-2 px-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 font-medium text-sm">
          Open
        </button>
      </div>
    </div>
  );
};

// Import icons (you'll need to install react-icons)
import { 
  FiFileText, 
  FiPlusCircle, 
  FiDollarSign, 
  FiBarChart2, 
  FiShoppingBag, 
  FiUser, 
  FiTruck, 
  FiGrid 
} from 'react-icons/fi';

export default Card;