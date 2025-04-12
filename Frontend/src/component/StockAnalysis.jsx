import React, { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

// Separated chart configurations by category
const productCharts = [
  { 
    id: 'cd0f6cb3-da4a-4272-a0b5-62d0b763092c', 
    title: 'Current Stock Levels vs. Reorder Thresholds',
    icon: '📊'
  },
  { 
    id: '96f4d958-4c2d-4162-8a47-2325293ba8ed', 
    title: 'Stock Status Overview',
    icon: '📈'
  },
  { 
    id: '5226098a-a2a6-4686-9b32-a279a5fab1cc', 
    title: 'Expiration Date Monitoring',
    icon: '⏱'
  },
  { 
    id: 'acc2694b-0326-46bf-9705-4037f5f493a3', 
    title: 'Product Sales Volume Chart',
    icon: '📦'
  }
];

const salesCharts = [
  { 
    id: 'e2598764-bcbf-4f31-9cf3-0ed5fbca9df5', 
    title: 'Total Sales per Day',
    icon: '💰'
  },
  { 
    id: 'b1388b61-7b8a-45bb-8fc4-27db614e200f', 
    title: 'Top-Selling Products',
    icon: '🏆'
  },
  { 
    id: 'eaebd065-695d-4826-ab41-464bfa6e585b', 
    title: 'Average Transaction per Month',
    icon: '📅'
  },
  { 
    id: '4e3917b3-a60b-43d4-8e42-cfb96c5471bf', 
    title: 'Total Quantity Sold',
    icon: '🔢'
  }
];

const StockAnalysis = () => {
  const productChartDivs = useRef([]);
  const salesChartDivs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('both');
  const [animatedItems, setAnimatedItems] = useState([]);
  const [chartHeight, setChartHeight] = useState('400px');

  // Responsive chart height based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight('300px');
      } else if (window.innerWidth < 1024) {
        setChartHeight('350px');
      } else {
        setChartHeight('400px');
      }
    };

    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadCharts = async () => {
      setIsLoading(true);
      setAnimatedItems([]); // Reset animations when section changes
      
      try {
        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-projects-kyxpskp'
        });
        
        // Set up a delay for staggered rendering on mobile
        const delay = window.innerWidth < 768 ? 100 : 150;
        
        // Load product charts if needed
        if (activeSection === 'both' || activeSection === 'products') {
          const productPromises = productCharts.map((config, index) => {
            const chart = sdk.createChart({
              chartId: config.id,
              height: chartHeight,
              theme: 'light',
              autoRefresh: true,
              maxDataAge: 300, // 5 minute refresh
              refreshInterval: 300 // 5 minute refresh
            });
            
            if (productChartDivs.current[index]) {
              return chart.render(productChartDivs.current[index])
                .catch(err => console.error('Error rendering product chart:', err));
            }
            return Promise.resolve();
          });
          
          await Promise.all(productPromises);
          
          // Animate product charts one by one
          for (let i = 0; i < productCharts.length; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            setAnimatedItems(prev => [...prev, productCharts[i].id]);
          }
        }
        
        // Load sales charts if needed
        if (activeSection === 'both' || activeSection === 'sales') {
          const salesPromises = salesCharts.map((config, index) => {
            const chart = sdk.createChart({
              chartId: config.id,
              height: chartHeight,
              theme: 'light',
              autoRefresh: true,
              maxDataAge: 300, // 5 minute refresh
              refreshInterval: 300 // 5 minute refresh
            });
            
            if (salesChartDivs.current[index]) {
              return chart.render(salesChartDivs.current[index])
                .catch(err => console.error('Error rendering sales chart:', err));
            }
            return Promise.resolve();
          });
          
          await Promise.all(salesPromises);
          
          // Animate sales charts one by one
          for (let i = 0; i < salesCharts.length; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            setAnimatedItems(prev => [...prev, salesCharts[i].id]);
          }
        }
      } catch (error) {
        console.error("Failed to load charts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCharts();
    
    // Cleanup function to handle component unmounting
    return () => {
      // Any cleanup needed for charts can go here
    };
  }, [activeSection, chartHeight]);

  const isAnimated = (id) => {
    return animatedItems.includes(id);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center p-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-t-2 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-base sm:text-lg text-blue-800 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 lg:mb-8 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-900 bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg shadow-md border-b-4 border-indigo-600 mb-3 sm:mb-4 text-center">
            📊 Inventory & Sales Dashboard
          </h2>
          
          <div className="bg-white rounded-full shadow-md p-1 flex space-x-1 overflow-x-auto w-full max-w-xs sm:max-w-md justify-center">
            <button 
              onClick={() => setActiveSection('both')} 
              className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeSection === 'both' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveSection('products')} 
              className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeSection === 'products' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveSection('sales')} 
              className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeSection === 'sales' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sales
            </button>
          </div>
        </div>
        
        {/* Products Dashboard Section */}
        {(activeSection === 'both' || activeSection === 'products') && (
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center mb-4 sm:mb-6 animate-slideInLeft">
              <div className="h-8 sm:h-10 lg:h-12 w-1 sm:w-2 bg-blue-600 mr-2 sm:mr-3 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-800">Products Dashboard</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {productCharts.map((config, index) => (
                <div 
                  key={config.id} 
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl border border-gray-100 ${
                    isAnimated(config.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-3 sm:p-4 flex items-center justify-between">
                    <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white flex items-center truncate">
                      <span className="mr-1 sm:mr-2 text-base sm:text-lg lg:text-xl">{config.icon}</span>
                      <span className="truncate">{config.title}</span>
                    </h3>
                    <span className="bg-white bg-opacity-20 rounded-full p-1 px-2 text-xs text-white whitespace-nowrap ml-1">LIVE</span>
                  </div>
                  <div 
                    ref={el => productChartDivs.current[index] = el} 
                    className="p-2 sm:p-4"
                    style={{ height: chartHeight }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Sales Dashboard Section */}
        {(activeSection === 'both' || activeSection === 'sales') && (
          <div>
            <div className="flex items-center mb-4 sm:mb-6 animate-slideInRight">
              <div className="h-8 sm:h-10 lg:h-12 w-1 sm:w-2 bg-indigo-600 mr-2 sm:mr-3 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-indigo-800">Sales Dashboard</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {salesCharts.map((config, index) => (
                <div 
                  key={config.id} 
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl border border-gray-100 ${
                    isAnimated(config.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-3 sm:p-4 flex items-center justify-between">
                    <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white flex items-center truncate">
                      <span className="mr-1 sm:mr-2 text-base sm:text-lg lg:text-xl">{config.icon}</span>
                      <span className="truncate">{config.title}</span>
                    </h3>
                    <span className="bg-white bg-opacity-20 rounded-full p-1 px-2 text-xs text-white whitespace-nowrap ml-1">LIVE</span>
                  </div>
                  <div 
                    ref={el => salesChartDivs.current[index] = el} 
                    className="p-2 sm:p-4"
                    style={{ height: chartHeight }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 lg:mt-12 text-center text-gray-500 text-xs sm:text-sm animate-fadeIn">
          <p className="font-medium">Data Auto-refreshes Every 5 Minutes</p>
          <p>Last updated: {new Date().toLocaleString()}</p>

        </div>
      </div>
      
      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StockAnalysis;
