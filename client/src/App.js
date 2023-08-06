import './App.css';
import image from './images/crystal-ball.png';

function App() {
  return (
    <div className="App">
      <div className="text-sentiment-app-header">
        <img className="crystal-ball-img" src={image} alt="Crystal Ball Emoji"/>
        <h1>text sentiment reader</h1>
      </div>
      <div className="text-sentiment-input-area">
        <span className="input-label">input text here: </span>
        <textarea className="input-text-box" placeholder="write a text and i'll tell you its underlying sentiment." rows={6}></textarea>
      </div>
      <div className="text-sentiment-output-area">
        <span className="output-label">Sentiment is </span>
        <h3 className="output-text">placeholder</h3>
      </div>
    </div>
  );
}

export default App;
