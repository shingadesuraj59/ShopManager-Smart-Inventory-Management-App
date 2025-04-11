import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import axios from 'axios';  // Make sure axios is imported

const Home = () => {
  const [userinfo, setuserinfo] = useState("");
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();
   
  useEffect(() => {
     setuserinfo(localStorage.getItem("loggedInUser"));
  }, []);
    
  const fetchdata = async () => {
    const url = "http://localhost:3000/api/";  // Correct URL
    const headers = {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    };

    try {
      const response = await axios.get(url, headers);
      setproduct(response.data);  // Use response.data for axios
    } catch (error) {
      handleError(error);  // Handle error properly
    }
  };
  
  useEffect(() => {
    fetchdata();
  }, []);
  
  const handleclick = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/login");
  };
   
  return (
    <div>
      <h1>{userinfo}</h1>
      <button onClick={handleclick}>Logout</button>
      {
        product.map((item, index) => (
          <ul key={index}>
            <span>{item.product}</span>:<span>{item.price}</span>
          </ul>
        ))
      }
    </div>
  );
};

export default Home;
