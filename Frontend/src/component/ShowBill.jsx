import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import { FiCalendar, FiMenu } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ShowBill = () => {
  const { fetchBill, bill } = useContext(StoreContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("day"); // 'day' or 'month'
  const [totalSales, setTotalSales] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    fetchBill();
  }, []);

  // Get unique dates with bills for calendar highlighting
  const getDatesWithBills = () => {
    const dateMap = {};
    bill.forEach(b => {
      const dateStr = new Date(b.date).toDateString();
      dateMap[dateStr] = true;
    });
    return Object.keys(dateMap).map(dateStr => new Date(dateStr));
  };

  const datesWithBills = getDatesWithBills();

  // Filter bills based on selected date and view mode
  const filteredBills = bill.filter(b => {
    const billDate = new Date(b.date);
    if (viewMode === "day") {
      return billDate.toDateString() === selectedDate.toDateString();
    } else {
      return (
        billDate.getMonth() === selectedDate.getMonth() &&
        billDate.getFullYear() === selectedDate.getFullYear()
      );
    }
  });

  // Calculate total sales
  useEffect(() => {
    const total = filteredBills.reduce((sum, bill) => sum + bill.grandTotal, 0);
    setTotalSales(total);
  }, [filteredBills]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  // Custom day component for the calendar with dots
  const renderDayContents = (day, date) => {
    const hasBills = datesWithBills.some(
      d => d.toDateString() === date.toDateString()
    );
    
    return (
      <div className="relative">
        {day}
        {hasBills && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 fixed h-full transition-all duration-300 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Filter Options</h2>
          <button
            onClick={() => {
              setViewMode("day");
              setSelectedDate(new Date());
            }}
            className={`w-full text-left py-3 px-4 mb-2 rounded ${
              viewMode === "day" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => {
              setViewMode("month");
              setSelectedDate(new Date());
            }}
            className={`w-full text-left py-3 px-4 rounded ${
              viewMode === "month" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Monthly View
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}>
        <div className="p-4">
          {/* Header with menu and calendar */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <FiMenu size={20} />
            </button>
            
            <div className="relative">
              <button
                onClick={toggleCalendar}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiCalendar />
                {viewMode === "day"
                  ? selectedDate.toLocaleDateString()
                  : selectedDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
              </button>
              
              {isCalendarOpen && (
                <div className="absolute right-0 mt-2 z-20 bg-white p-2 rounded-lg shadow-xl">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    inline
                    calendarClassName="rounded-lg"
                    showMonthYearPicker={viewMode === "month"}
                    renderDayContents={renderDayContents}
                    highlightDates={datesWithBills}
                    onMonthChange={(date) => setSelectedDate(date)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sales Summary */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {viewMode === "day" ? "Daily Bills" : "Monthly Bills"}
            </h1>
            <div className="text-lg font-semibold text-blue-600">
              Total Sales: ₹{totalSales.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {filteredBills.length} bills found
            </div>
          </div>

          {/* Bills List */}
          <div className="space-y-4">
            {filteredBills.length > 0 ? (
              filteredBills.map((bill, index) => (
                <BillCard key={index} bill={bill} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No bills found for the selected {viewMode}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate Bill Card Component
const BillCard = ({ bill }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{bill.customerName}</h3>
          <div className="text-sm text-gray-500">
            {new Date(bill.date).toLocaleString()}
          </div>
        </div>
        <div className="text-lg font-bold">₹{bill.grandTotal.toFixed(2)}</div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Items:</h4>
          <ul className="space-y-2">
            {bill.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>₹{item.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-sm">
            Net Quantity:{" "}
            {bill.items.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBill;