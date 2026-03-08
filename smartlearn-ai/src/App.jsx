import { useState } from "react"
import ReactMarkdown from "react-markdown";

function App() {

  const [topic,setTopic] = useState("")
  const [answer,setAnswer] = useState("")
  const [loading,setLoading] = useState(false)
  const [mode,setMode] = useState("concept")
  const [language,setLanguage] = useState("English")

  const explainTopic = async () => {

    setLoading(true)
    setAnswer("")

    const response = await fetch(
      "https://uxf8a50b2k.execute-api.us-east-1.amazonaws.com/explain",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
       body:JSON.stringify({
        topic: mode==="concept"
              ? topic
              : "Explain this code step by step:\n"+topic,
        language: language
      })
      }
    )

    const data = await response.json()

    setAnswer(data.answer)
    setLoading(false)
  }
  const useTopic = async (t) => {

  setTopic(t)
  setLoading(true)
  setAnswer("")

  const response = await fetch(
    "https://uxf8a50b2k.execute-api.us-east-1.amazonaws.com/explain",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        topic:t
      })
    }
  )

  const data = await response.json()
        setAnswer(data.answer)
        setLoading(false)
      }

  <p className="text-center text-sm text-gray-400 mt-6">
  Powered by AWS Bedrock • Built for AI for Bharat
  </p>
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">

        <header className="mb-6 text-center">

          <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          className="w-16 h-16 mx-auto mb-2 opacity-90"
          />

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SmartLearn AI
          </h1>

          <p className="text-gray-600 mt-2">
          AI Tutor for Indian Students 🇮🇳
          </p>

          </header>

      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-4xl w-full mx-auto px-8">

        
        <p className="text-center text-gray-600 mb-6">
          AI Tutor for Indian Students 🇮🇳
          Explains programming concepts in simple language using AI.
        </p>

        <div className="flex gap-2 mb-4 flex-wrap">

        <div className="flex gap-4 mb-4">

          <button
          onClick={()=>setMode("concept")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-lg w-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
          Explain Concept
          </button>

          <button
          onClick={()=>setMode("code")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
          Explain Code
          </button>

          </div>
        <button
        onClick={()=>useTopic("Python loops")}
        className="bg-gray-200 hover:bg-indigo-200 px-3 py-1 rounded-md transition">
        Loops
        </button>

        <button
        onClick={()=>useTopic("Python functions")}
        className="bg-gray-100 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg shadow-sm transition">
        Functions
        </button>

        <button
        onClick={()=>useTopic("Recursion")}
        className="bg-gray-100 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg shadow-sm transition">
        Recursion
        </button>

        <button
        onClick={()=>useTopic("Binary Search")}
        className="bg-gray-100 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg shadow-sm transition">
        Binary Search
        </button>

        <select
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg shadow-sm"
        >

        <option>English</option>
        <option>Hindi</option>
        <option>Marathi</option>

        </select>

        </div>
        {mode==="concept" && (
          <input
          type="text"
          placeholder="Example: Python recursion kya hai"
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          )}
        {mode==="code" && (
          <textarea
          placeholder="Paste your code here..."
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          )}
        <button
          onClick={explainTopic}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-lg w-full font-semibold shadow-lg hover:scale-105 transition"
          >
          {loading
            ? "Generating..."
            : mode==="concept"
              ? "Explain Concept"
              : "Explain Code"}
        </button>

        {loading && (
          <div className="mt-4 text-gray-500 animate-pulse">
          AI is generating explanation...
          </div>
          )}

        {answer && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-inner">

            <h2 className="text-2xl font-bold text-indigo-700 mb-4">AI Explanation</h2>

            <div className="prose max-w-none text-gray-800">
              <ReactMarkdown
                  components={{
                    code({inline, children}) {
                      return (
                        <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {answer}
                </ReactMarkdown>
            </div>

          </div>
        )}

      </div>
      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-600 opacity-80">
        Powered by AWS Bedrock • Built for AI for Bharat 🇮🇳
      </footer>

    </div>
  )
}

export default App