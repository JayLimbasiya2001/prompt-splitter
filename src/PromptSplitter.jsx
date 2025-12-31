import { useState, useEffect } from "react";
import "./PromptSplitter.css";

export default function PromptSplitter() {
  const [inputText, setInputText] = useState("");
  const [parts, setParts] = useState([]);
  const [partSize, setPartSize] = useState(10000); // Default characters per part

  useEffect(() => {
    // HilltopAds script
    const script = document.createElement("script");
    script.src =
      "https://monthly-ease.com/bO3/VM0uP.3NpAvkbQm/VQJdZxD/0/2xN_zJM/4aNVDGAyyeLaT/YA3MM/zRgx0gMoDKMZ";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSplit = () => {
    if (!inputText) return;

    const splitArray = [];
    let i = 0;
    let partNumber = 1;
    while (i < inputText.length) {
      splitArray.push(
        `[Part ${partNumber}] ${inputText.slice(i, i + partSize)}`
      );
      i += partSize;
      partNumber++;
    }
    setParts(splitArray);
  };

  return (
    <div className="prompt-splitter-container">
      <h1 className="title">Prompt Splitter Tool</h1>

      <textarea
        className="input-box"
        placeholder="Paste your prompt here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <div className="options">
        <label>
          Part size (characters):
          <input
            type="number"
            value={partSize}
            onChange={(e) => setPartSize(Number(e.target.value))}
          />
        </label>
        <button onClick={handleSplit}>Split Prompt</button>
      </div>

      <div className="output-section">
        {parts.length > 0 && <h2>Split Parts:</h2>}
        {parts.map((part, index) => (
          <div key={index} className="part-box">
            {part}
          </div>
        ))}
      </div>

      {/* Ad container */}
      <div className="ad-container" id="ad-container"></div>
    </div>
  );
}
