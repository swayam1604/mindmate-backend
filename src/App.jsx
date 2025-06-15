
import React, { useState } from 'react';
import './index.css';

function App() {
  const [journal, setJournal] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!journal.trim()) return;
  setLoading(true);

  try {
   const res = await fetch('https://your-backend-service-name.onrender.com/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ journal }),
});
 

    const data = await res.json();
    setResponse(data.analysis);
  } catch (err) {
    console.error("Frontend error:", err);
    setResponse('Something went wrong. Please try again.');
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in">🧠 MindMate</h1>
      <p className="text-lg mb-6">Your AI-powered mental wellness companion</p>

      <textarea
        className="w-full max-w-2xl h-40 p-4 rounded-lg text-black resize-none focus:outline-none"
        placeholder="Write about how you're feeling today..."
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {response && (
        <div className="mt-6 bg-white text-black p-6 rounded-xl max-w-2xl w-full shadow-xl animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-2">AI Reflection</h2>
          <p>{response}</p>
        </div>
      )}

      <footer className="absolute bottom-4 text-xs text-gray-400">Made by Swayam Sharma</footer>
    </div>
  );
}

export default App;
