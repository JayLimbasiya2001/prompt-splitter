import { useState } from "react";

export default function PromptSplitter() {
  const [prompt, setPrompt] = useState("");
  const [limit, setLimit] = useState(10000);
  const [chunks, setChunks] = useState([]);

  const splitPrompt = (text, limit) => {
    const result = [];
    let current = "";
    text.split(" ").forEach((word) => {
      if ((current + word).length > limit) {
        result.push(current.trim());
        current = word + " ";
      } else {
        current += word + " ";
      }
    });
    if (current.trim()) result.push(current.trim());
    return result;
  };

  const handleSplit = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt to split!");
      return;
    }
    setChunks(splitPrompt(prompt, Number(limit)));
  };

  const handleCopy = (chunk, index, total) => {
    const textToCopy = `[START PART ${index + 1}/${total}]
${chunk}
[END PART ${index + 1}/${total}]
Instruction: Send each part to AI in order. Do not ask AI to answer until all parts are sent.`;
    navigator.clipboard.writeText(textToCopy);
    // alert(`Copied part ${index + 1}/${total}`);
  };

  return (
    <div className="prompt-splitter container">
      <h1>ChatGPT Prompt Splitter</h1>
      <p>Paste your long prompt below and split it into multiple parts with instructions for AI.</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Paste your long prompt here..."
      />
      <div className="input-row">
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Character limit per part"
        />
        <button onClick={handleSplit}>Split Prompt</button>
      </div>

      <div className="chunks">
        {chunks.map((chunk, index) => (
          <div key={index} className="chunk-card">
            <h3>Part {index + 1}/{chunks.length}</h3>
            <textarea readOnly value={chunk} />
            <button onClick={() => handleCopy(chunk, index, chunks.length)}>Copy Part</button>
          </div>
        ))}
      </div>

      <div className="seo-content">
        <h2>How to Use the Prompt Splitter</h2>
        <p>Split long prompts for ChatGPT into parts. Copy each part with instructions so AI waits until all parts are sent.</p>

        <h2>Use Cases</h2>
        <ul>
          <li>Research and summarization</li>
          <li>Storytelling or script writing</li>
          <li>Code generation and debugging</li>
          <li>AI conversations with long context</li>
        </ul>

        <h2>Tips</h2>
        <p>Always copy each part in order. Do not ask AI to answer until all parts are sent.</p>
      </div>
    </div>
  );
}
