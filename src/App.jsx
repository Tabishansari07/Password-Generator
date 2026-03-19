import { useState } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumber) chars += "0123456789";
    if (includeSymbol) chars += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (!chars) {
      alert("Select at least one option!");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Copied!");
  };

  const getStrength = () => {
    let strength = 0;
    if (includeUpper) strength++;
    if (includeLower) strength++;
    if (includeNumber) strength++;
    if (includeSymbol) strength++;
    if (length >= 12) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3 || strength === 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          Password Generator
        </h1>

        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-2 border rounded mb-3"
        />

        <button
          onClick={copyToClipboard}
          className="w-full bg-green-500 text-white py-2 rounded mb-4"
        >
          Copy Password
        </button>

        <label className="block mb-2">
          Length: {length}
        </label>
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full mb-4"
        />

        <div className="space-y-2 mb-4">
          <label>
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
            /> Uppercase
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
            /> Lowercase
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={() => setIncludeNumber(!includeNumber)}
            /> Numbers
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={includeSymbol}
              onChange={() => setIncludeSymbol(!includeSymbol)}
            /> Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 text-white py-2 rounded mb-3"
        >
          Generate Password
        </button>

        <p className="text-center font-semibold">
          Strength: {getStrength()}
        </p>
      </div>
    </div>
  );
}

export default App;