import { useState, useEffect } from "react";
import "./PromptSplitter.css";

export default function PromptSplitter() {
  const [inputText, setInputText] = useState("");
  const [parts, setParts] = useState([]);
  const [partSize, setPartSize] = useState(10000);
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      const script = document.createElement("script");
      script.src =
        "//kaleidoscopicamount.com/c.D/9T6ybd2P5klZScW/Qp9pN/jpcbz/OuDbQIwjMSil0O2/NmzbMU4vN/DeAnzh";
      script.async = true;
      script.referrerPolicy = "no-referrer-when-downgrade";

      const container = document.getElementById("ad-container");
      if (container) {
        container.appendChild(script);
      }

      setAdsLoaded(true);
    } else {
      setAdsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      const script = document.createElement("script");
      script.async = true;
      script.referrerPolicy = "no-referrer-when-downgrade";
      script.innerHTML = `
        (function(zzyqo){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = zzyqo || {};
          s.src = "//excitedzone.com/bPXHVRspd.G/l/0/YKW/ca/GeFmI9_u-ZCUol/krPJTQY/3/NMDqQOy/MnzokxtNNrjycU0DNKDyIu0AMaAH";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({});
      `;

      const bannerContainer = document.getElementById("banner-ad");
      if (bannerContainer) {
        bannerContainer.appendChild(script);
      }
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

      <div className="banner-ad" id="banner-ad"></div>

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

      <div>
  <h1>Free ChatGPT Prompt Splitter Tool</h1>
  <h2>Split Long Prompts into Smaller Parts for AI Processing</h2>
  <p>Do you have long ChatGPT prompts that exceed token limits? Use our free online prompt splitter to divide your text into multiple smaller parts for easier AI processing.</p>

  <h3>How to Use ChatGPT Prompt Splitter</h3>
  <ol>
    <li>Paste your long prompt in the input box.</li>
    <li>Set the number of characters or words per part.</li>
    <li>Click "Split Prompt" and get multiple smaller chunks.</li>
  </ol>

  <h3>Why Use This Prompt Splitter?</h3>
  <ul>
    <li>Handle large AI prompts without errors.</li>
    <li>Save time by automatically splitting text.</li>
    <li>Free and online—no registration required.</li>
  </ul>

  <p>Keywords included naturally: ChatGPT prompt splitter, split long prompts, AI tool, multi-part prompt.</p>
</div>

    </div>
  );
}
