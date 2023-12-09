import React, { useState, useEffect } from "react";
import _ from "lodash";

function App() {
	const bgColor = {
    backgroundColor: '#3498db', 
    padding: '20px',
    color: '#fff', 
   };
  const [data, setData] = useState([]);
  const sortedArray = _.orderBy(data, ['lat'], ['name']);
  const reversedArray = _.reverse(sortedArray);
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8080/hwreadservice/api/v1/getcities';
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
	<div style={bgColor}>
      <h1>Welcome To Honeywell</h1>
      <p>State with cities lng and lat information.</p>
      <select>
        <option value="">please select city</option>
        {reversedArray.map((item) => (
          <option key={item.lat} value={item.lat}>
            {`Lat : ${item.lat}`}  {`Lon : ${item.lon}`}{"--"} {`City : ${item.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;