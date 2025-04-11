// import { React } from 'react';
// import Card from "./card";
// import Navbar from "./navbar";
// import Footer from "./footer";
// import { ToastContainer } from 'react-toastify';
// import { 
//   FiTrendingUp, 
//   FiDollarSign, 
//   FiPackage, 
//   FiUsers, 
//   FiPieChart,
//   FiShoppingBag,
//   FiFileText,
//   FiClock,
//   FiBarChart2,
//   FiShoppingCart
// } from 'react-icons/fi';

// const Dashboard = () => {
//   // Sample data for statistics
//   const stats = [
//     { title: "Today's Sales", value: "₹12,450", change: "+12%", icon: <FiTrendingUp className="text-green-500" />, color: "bg-green-100" },
//     { title: "Monthly Revenue", value: "₹2,34,500", change: "+8%", icon: <FiDollarSign className="text-blue-500" />, color: "bg-blue-100" },
//     { title: "Total Products", value: "128", change: "+5", icon: <FiPackage className="text-purple-500" />, color: "bg-purple-100" },
//     { title: "Active Suppliers", value: "24", change: "+2", icon: <FiUsers className="text-orange-500" />, color: "bg-orange-100" }
//   ];

//   const recentActivities = [
//     { id: 1, type: "sale", title: "New sale recorded", details: "Order #1001 for ₹1,250", time: "25 minutes ago", icon: <FiShoppingCart className="text-blue-600" /> },
//     { id: 2, type: "stock", title: "Low stock alert", details: "Product #P-2045 (Wireless Mouse)", time: "1 hour ago", icon: <FiPackage className="text-orange-600" /> },
//     { id: 3, type: "supplier", title: "New supplier added", details: "TechGadgets Inc.", time: "3 hours ago", icon: <FiUsers className="text-green-600" /> }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Welcome Banner with Date */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div className="bg-white rounded-xl shadow-sm p-6 w-full md:w-auto flex-1">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Good Morning, Admin!</h1>
//             <p className="text-gray-600">Here's what's happening with your store today</p>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center w-full md:w-auto">
//             <div className="text-center">
//               <p className="text-sm text-gray-500">Today is</p>
//               <p className="text-lg font-semibold text-gray-800">
//                 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start">
//                 <div className={`p-3 rounded-lg ${stat.color} mb-3`}>
//                   {stat.icon}
//                 </div>
//                 <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {stat.change}
//                 </span>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
//               <p className="text-sm text-gray-500">{stat.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
//             <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
//               View all <FiBarChart2 className="ml-1" />
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             <Card 
//               title="Shop Products" 
//               description="Browse and manage products" 
//               icon={<FiShoppingBag className="w-6 h-6" />}
//               bgColor="bg-blue-50"
//               iconColor="text-blue-600"
//             />
//             <Card 
//               title="Supplier Data" 
//               description="Create new invoices" 
//               icon={<FiFileText className="w-6 h-6" />}
//               bgColor="bg-green-50"
//               iconColor="text-green-600"
//             />
//             <Card 
//               title="Show Bills" 
//               description="Analyze transactions" 
//               icon={<FiDollarSign className="w-6 h-6" />}
//               bgColor="bg-purple-50"
//               iconColor="text-purple-600"
//             />
//             <Card 
//               title="Stock Analysis" 
//               description="Check low inventory" 
//               icon={<FiPackage className="w-6 h-6" />}
//               bgColor="bg-orange-50"
//               iconColor="text-orange-600"
//             />
//             <Card 
//               title="Notes" 
//               description="Check low inventory" 
//               icon={<FiPackage className="w-6 h-6" />}
//               bgColor="bg-orange-50"
//               iconColor="text-orange-600"
//             />
//           </div>
//         </div>

//         {/* Recent Activity and Performance Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Recent Activity */}
//           <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
//               <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
//                 <FiClock className="mr-1" /> Timeline
//               </button>
//             </div>
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div key={activity.id} className="flex items-start">
//                   <div className={`p-2 rounded-lg mr-3 mt-1 ${activity.type === 'sale' ? 'bg-blue-100' : activity.type === 'stock' ? 'bg-orange-100' : 'bg-green-100'}`}>
//                     {activity.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-800">{activity.title}</h4>
//                     <p className="text-sm text-gray-500">{activity.details}</p>
//                     <span className="text-xs text-gray-400">{activity.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Sales Chart (Placeholder) */}
//           <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
//               <select className="text-sm border rounded px-2 py-1 text-gray-600">
//                 <option>Last 7 days</option>
//                 <option>Last 30 days</option>
//                 <option>Last quarter</option>
//               </select>
//             </div>
//             <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
//               <p className="text-gray-500">Sales chart visualization</p>
//             </div>
//           </div>
//         </div>

//         {/* Inventory Summary */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Summary</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="border rounded-lg p-4">
//               <div className="flex items-center mb-2">
//                 <div className="p-2 rounded-lg bg-red-100 mr-3">
//                   <FiPackage className="text-red-600" />
//                 </div>
//                 <h3 className="font-medium">Low Stock Items</h3>
//               </div>
//               <p className="text-2xl font-bold text-gray-800 mb-1">8</p>
//               <p className="text-sm text-gray-500">Items need restocking</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <div className="flex items-center mb-2">
//                 <div className="p-2 rounded-lg bg-yellow-100 mr-3">
//                   <FiTrendingUp className="text-yellow-600" />
//                 </div>
//                 <h3 className="font-medium">Top Selling</h3>
//               </div>
//               <p className="text-2xl font-bold text-gray-800 mb-1">15</p>
//               <p className="text-sm text-gray-500">Popular products</p>
//             </div>
//             <div className="border rounded-lg p-4">
//               <div className="flex items-center mb-2">
//                 <div className="p-2 rounded-lg bg-green-100 mr-3">
//                   <FiShoppingBag className="text-green-600" />
//                 </div>
//                 <h3 className="font-medium">Total Categories</h3>
//               </div>
//               <p className="text-2xl font-bold text-gray-800 mb-1">12</p>
//               <p className="text-sm text-gray-500">Product categories</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <Footer />

//       <ToastContainer />
//     </div>
//   );
// }

// export default Dashboard;



import { React } from 'react';
import Card from "./card";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from 'react-toastify';
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiPackage, 
  FiUsers, 
  FiPieChart,
  FiShoppingBag,
  FiFileText,
  FiClock,
  FiBarChart2,
  FiShoppingCart,
  FiBookmark
} from 'react-icons/fi';

const Dashboard = () => {
  // Sample data for statistics
  const stats = [
    { title: "Today's Sales", value: "₹12,450", change: "+12%", icon: <FiTrendingUp className="text-green-500" />, color: "bg-green-100" },
    { title: "Monthly Revenue", value: "₹2,34,500", change: "+8%", icon: <FiDollarSign className="text-blue-500" />, color: "bg-blue-100" },
    { title: "Total Products", value: "128", change: "+5", icon: <FiPackage className="text-purple-500" />, color: "bg-purple-100" },
    { title: "Active Suppliers", value: "24", change: "+2", icon: <FiUsers className="text-orange-500" />, color: "bg-orange-100" }
  ];

  const recentActivities = [
    { id: 1, type: "sale", title: "New sale recorded", details: "Order #1001 for ₹1,250", time: "25 minutes ago", icon: <FiShoppingCart className="text-blue-600" /> },
    { id: 2, type: "stock", title: "Low stock alert", details: "Product #P-2045 (Wireless Mouse)", time: "1 hour ago", icon: <FiPackage className="text-orange-600" /> },
    { id: 3, type: "supplier", title: "New supplier added", details: "TechGadgets Inc.", time: "3 hours ago", icon: <FiUsers className="text-green-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner with Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 w-full md:w-auto flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Good Morning, Admin!</h1>
            <p className="text-gray-600">Here's what's happening with your store today</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center w-full md:w-auto">
            <div className="text-center">
              <p className="text-sm text-gray-500">Today is</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions - Modified to include Notes in a horizontal layout */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              View all <FiBarChart2 className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Changed to 5 columns */}
            <Card 
              title="Shop Products" 
              description="Browse and manage products" 
              icon={<FiShoppingBag className="w-6 h-6" />}
              bgColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <Card 
              title="Supplier Data" 
              description="Manage suppliers" 
              icon={<FiUsers className="w-6 h-6" />}
              bgColor="bg-green-50"
              iconColor="text-green-600"
            />
            <Card 
              title="Show Bills" 
              description="View transaction history" 
              icon={<FiFileText className="w-6 h-6" />}
              bgColor="bg-purple-50"
              iconColor="text-purple-600"
            />
            <Card 
              title="Stock Analysis" 
              description="Check inventory levels" 
              icon={<FiPackage className="w-6 h-6" />}
              bgColor="bg-orange-50"
              iconColor="text-orange-600"
            />
            <Card 
              title="Notes" 
              description="View product notes" 
              icon={<FiBookmark className="w-6 h-6" />}
              bgColor="bg-indigo-50"
              iconColor="text-indigo-600"
              linkTo="/notes" // Add this prop if you want the card to link to your notes page
            />
          </div>
        </div>

        {/* Recent Activity and Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <FiClock className="mr-1" /> Timeline
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 mt-1 ${activity.type === 'sale' ? 'bg-blue-100' : activity.type === 'stock' ? 'bg-orange-100' : 'bg-green-100'}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Chart (Placeholder) */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
              <select className="text-sm border rounded px-2 py-1 text-gray-600">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
              </select>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Sales chart visualization</p>
            </div>
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-lg bg-red-100 mr-3">
                  <FiPackage className="text-red-600" />
                </div>
                <h3 className="font-medium">Low Stock Items</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">8</p>
              <p className="text-sm text-gray-500">Items need restocking</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-lg bg-yellow-100 mr-3">
                  <FiTrendingUp className="text-yellow-600" />
                </div>
                <h3 className="font-medium">Top Selling</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">15</p>
              <p className="text-sm text-gray-500">Popular products</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-lg bg-green-100 mr-3">
                  <FiShoppingBag className="text-green-600" />
                </div>
                <h3 className="font-medium">Total Categories</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">12</p>
              <p className="text-sm text-gray-500">Product categories</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <ToastContainer />
    </div>
  );
}

export default Dashboard;