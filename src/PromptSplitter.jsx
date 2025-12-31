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
      // For HilltopAds Direct URL, we need to use it differently
      // Option 1: Try loading as popunder script instead
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
        atOptions = {
          'key' : '3WVv0JPk3HpvcbRmwVGJlZ_Dp0u2NozrM4DNKD_AfylLTzYQ3mMWzTgU0uMADMe',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      document.head.appendChild(script);
      
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "//www.topcreativeformat.com/3WVv0JPk3HpvcbRmwVGJlZ_Dp0u2NozrM4DNKD_AfylLTzYQ3mMWzTgU0uMADMe/invoke.js";
      invokeScript.async = true;
      invokeScript.onload = () => {
        console.log("✅ Ad script loaded successfully");
        setAdsLoaded(true);
      };
      invokeScript.onerror = () => {
        console.error("❌ Failed to load ad script");
        console.error("Note: Ads may take 24-48 hours to start showing after domain approval");
      };
      
      const container = document.getElementById("ad-container");
      if (container) {
        container.appendChild(invokeScript);
      }
      
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
        if (invokeScript.parentNode) invokeScript.parentNode.removeChild(invokeScript);
      };
    } else {
      // Local placeholder for testing
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
