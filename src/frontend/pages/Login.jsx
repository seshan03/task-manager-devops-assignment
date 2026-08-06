import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginAdmin, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // load Google Identity Services if VITE_GOOGLE_CLIENT_ID is present
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            await googleLogin(response.credential);
          } catch (err) {
            setError(err.message || "Google login failed");
          }
        },
      });

      google.accounts.id.renderButton(document.getElementById("google-button"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [googleLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginAdmin(email, password);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="login-page-bg absolute inset-0 pointer-events-none"></div>
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-stretch gap-0 min-h-[480px]">
          <div className="hidden md:flex md:flex-1 items-center p-10 rounded-l-lg text-white bg-gradient-to-br from-indigo-600 to-violet-600">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-indigo-100">Teach Tomorrow With Confidence</h1>
              <p className="mb-4 text-indigo-100">Quickly see what you need to teach and which assignments you promised—so you never miss a commitment.</p>
              <ul className="space-y-2 text-indigo-100">
                <li>• View next-day lessons at a glance</li>
                <li>• Track promised assignments</li>
                <li>• Keep students on schedule</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-96 p-8 bg-white shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500 bg-clip-text text-transparent">Login</h2>

            <form onSubmit={handleSubmit} className="flex h-full flex-col space-y-4">
              <div>
                <label className="block text-sm text-indigo-700">Email</label>
                <div className="mt-1 rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-transparent bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-indigo-700">Password</label>
                <div className="mt-1 rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-transparent bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200"
                  />
                </div>
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded shadow-sm transition hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  Log in as admin
                </button>

                <div>
                  <div id="google-button" className="mt-2 flex justify-center" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 