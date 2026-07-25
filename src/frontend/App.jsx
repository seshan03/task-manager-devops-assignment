import { useEffect, useState } from "react";
import { checkBackendHealth } from "./services/api";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend connection failed");
      });
  }, []);

  return (
    <div>
      <h1>Lecturer Teaching Companion</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;