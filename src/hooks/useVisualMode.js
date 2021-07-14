const { useState } = require("react");

//useVisualMode - changes mode based on user actions
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      setHistory([...history.slice(0, history.length - 1), history.pop()]);
    }
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1)];
      });
    }
  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}
