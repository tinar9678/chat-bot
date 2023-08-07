import { useState } from 'react';
import './App.css';
import image from './images/crystal-ball.png';

function App() {
  const [textAreaString, setTextArea] = useState("");
  const [outputString, setOutputString] = useState("");

  const handleTextAreaChange = (value) => {
    setTextArea(value);
  }
  
  const handleKeyDown = async (key) => {
    if (key === 'Enter') {
      // Grab input from input text box and feed to gpt3.5
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textAreaString,
        })
      })
      const json = await response.json();
      setOutputString(json.data);
    }
  }

  // TODO(tinaryu): Update the output-text to include the response from gpt
  return (
    <div className="App">
      <div className="text-sentiment-app-header">
        <img className="crystal-ball-img" src={image} alt="Crystal Ball Emoji"/>
        <h1>text sentiment reader</h1>
      </div>
      <div className="text-sentiment-input-area">
        <span className="input-label">input text here: </span>
        <textarea className="input-text-box" 
                  placeholder="write a text and i'll tell you its underlying sentiment." 
                  rows={6} 
                  onKeyDown={(e) => handleKeyDown(e.key)}
                  onChange={(e) => {handleTextAreaChange(e.target.value)}}
                  value={textAreaString}></textarea>
      </div>
      <div className="text-sentiment-output-area">
        <h3 className="output-label">Sentiment is</h3>
        <h3 className="output-text">{outputString}</h3>
      </div>
    </div>
  );
}

export default App;
