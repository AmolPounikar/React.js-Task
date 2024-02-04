import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState({});
  const api_key = '88f89c23ae527e910cbefe6ccc291a89';
  const apiUrl = `https://api.forexrateapi.com/v1/latest?api_key=${api_key}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const responseData = response.data;
        if (responseData.success === false) {
          console.error('API error:', responseData.error.message);
          return;
        }

        setData(responseData);
      } catch (error) {
        console.error('Error fetching forex rates:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className='bg-secondary'>
      {data.rates ? (
        <div>
          <h1>Currency Rates</h1>
          <p>
            <strong>Base:</strong> {data.base}
          </p>
          <div className="card bg-info">
            <div className="card-body">
              <h5 className="card-title">Currency Rates</h5>
              <div className="row">
                {Object.keys(data.rates).map((currency) => (
                  <div key={currency} className="col-sm-2 mb-4">
                    <div className="card border border-dark">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">{currency} :- {data.rates[currency]}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <br></br>
      <p className='ml-4'>
        <strong>Timestamp:</strong> {data.timestamp}
      </p>
      <br></br>
    </div>
  );
};

export default App;
