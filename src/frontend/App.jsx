import LecturerDashboard from "./pages/LecturerDashboard";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Login />;

  return <LecturerDashboard />;
}

export default App;