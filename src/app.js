import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [postResponse, setPostResponse] = useState(null);
  const [getResponse, setGetResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await fetch('https://bajaj-backend-gold.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData.data }),
      });
      const data = await res.json();
      setPostResponse(data);
    } catch (error) {
      console.error('Invalid JSON');
    }
  };

  const handleGetRequest = async () => {
    try {
      const res = await fetch('https://bajaj-backend-gold.vercel.app/bfhl', {
        method: 'GET',
      });
      const data = await res.json();
      setGetResponse(data);
    } catch (error) {
      console.error('Error fetching GET response');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">{`21BDS0268`}</h1>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter JSON"
        />
        <button className="submit-btn" onClick={handleSubmit}>Submit POST Request</button>
      </div>

      {postResponse && (
        <div className="table-container animate">
          <h2>POST Response</h2>
          <table className="response-table">
            <tbody>
              <tr>
                <td><strong>Success:</strong></td>
                <td>{postResponse.is_success ? 'True' : 'False'}</td>
              </tr>
              <tr>
                <td><strong>User ID:</strong></td>
                <td>{postResponse.user_id}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{postResponse.email}</td>
              </tr>
              <tr>
                <td><strong>Roll Number:</strong></td>
                <td>{postResponse.roll_number}</td>
              </tr>
              <tr>
                <td><strong>Numbers:</strong></td>
                <td>
                  <ul>
                    {postResponse.numbers.map((number, index) => (
                      <li key={index}>{number}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Alphabets:</strong></td>
                <td>
                  <ul>
                    {postResponse.alphabets.map((alphabet, index) => (
                      <li key={index}>{alphabet}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td><strong>Highest Lowercase Alphabet:</strong></td>
                <td>{postResponse.highest_lowercase_alphabet.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button className="get-btn" onClick={handleGetRequest}>Click for GET Endpoint</button>

      {getResponse && (
        <div className="get-response animate">
          <h2>GET Response</h2>
          <p>Operation Code: {getResponse.operation_code}</p>
        </div>
      )}
    </div>
  );
}

export default App;
