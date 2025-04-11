import { useState } from "react";

const Show = ({ bills }) => {
  const [detailsVisible, setDetailsVisible] = useState({}); // Track visibility for each bill

  const toggleDetails = (index) => {
    setDetailsVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex flex-wrap gap-4">
      {bills.map((bill, index) => (
        <div 
          key={index} 
          className="flex flex-col w-full h-auto rounded-lg bg-gray-100 shadow-md p-4 transition-transform duration-300 hover:shadow-lg cursor-pointer" 
          onClick={() => toggleDetails(index)} // Toggle details on card click
        >
          <div className="">
            <h3 className="font-semibold text-lg">Customer Name: {bill.customerName}</h3>
            <span className="text-lg font-semibold">Grandtotal :${bill.grandTotal}</span>
          </div>
          {detailsVisible[index] && ( // Conditionally render details
            <div className="mt-4">
              <h4 className="font-semibold">Items:</h4>
              <ul>
                {bill.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex justify-between">
                    <span>{item.productName} (Qty: {item.quantity})</span>
                    <span>${item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detailsVisible[index] && ( // Show net quantity only when details are visible
            <div className="mt-2 font-semibold">
              Net Quantity: {bill.items.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Show;



