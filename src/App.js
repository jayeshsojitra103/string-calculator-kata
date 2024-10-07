import { useState } from "react";
import add from "./StringCalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const processedValue = input.replace(/\\n/g, "\n");
      const sum = add(processedValue);
      setResult(sum);
      setInput("");
    } catch (err) {
      if (err) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">String Calculator</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="input" className="form-label">
                Enter numbers (comma-separated or custom delimiter):
              </label>
              <input
                type="text"
                id="input"
                className="form-control"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 1,2 or //;\n1;2"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Calculate
            </button>
          </form>

          {/* Result section */}
          {result !== null && (
            <div className="alert alert-success mt-3">
              <h4>Result: {result}</h4>
            </div>
          )}

          {/* Error section */}
          {error && (
            <div className="alert alert-danger mt-3">
              <h4>Error: {error}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
