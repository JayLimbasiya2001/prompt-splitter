import { useState, useEffect } from "react";
import "./PromptSplitter.css";

export default function PromptSplitter() {
  const [inputText, setInputText] = useState("");
  const [parts, setParts] = useState([]);
  const [partSize, setPartSize] = useState(10000); // Default characters per part
  const [adsLoaded, setAdsLoaded] = useState(false);

useEffect(() => {
    // Only load ads on live site
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      // HilltopAds Popunder - Direct implementation
      const key = "3WVv0JPk3HpvcbRmwVGJlZ_Dp0u2NozrM4DNKD_AfylLTzYQ3mMWzTgU0uMADMe";
      
      // Try loading the direct URL link instead of script for popunder
      // Popunders work on user interaction
      const handleUserInteraction = () => {
        // Open the popunder link on first click
        const popUrl = `https://monthly-ease.com/b.${key}`;
        window.open(popUrl, '_blank');
        // Remove listener after first use
        document.removeEventListener('click', handleUserInteraction);
        console.log("✅ Popunder triggered");
      };
      
      // Add click listener for popunder
      document.addEventListener('click', handleUserInteraction, { once: true });
      
      console.log("⚠️ Note: This is a POPUNDER ad zone.");
      console.log("It will open in a new window on first user click.");
      console.log("For banner ads that show on the page, create a Banner zone in HilltopAds.");
      
      setAdsLoaded(true);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
      };
    } else {
      setAdsLoaded(true);
    }
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
      <div className="ad-container" id="ad-container">
        {!adsLoaded && (
          <div
            style={{
              border: "2px dashed #ccc",
              padding: "10px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Ad placeholder (shows locally)
          </div>
        )}
      </div>
    </div>
  );
}
