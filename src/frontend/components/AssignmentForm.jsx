import { useState } from "react";
import { fetchWithAuth } from "../services/api";

function AssignmentForm({ modules = [], onCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [intake, setIntake] = useState("");
  const [deadline, setDeadline] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function findModuleByName(name) {
    if (!name) return null;
    const lower = name.trim().toLowerCase();
    return modules.find((m) => (m.name || "").toLowerCase() === lower) || null;
  }

  async function safeJson(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { __raw: text };
    }
  }

  async function ensureModuleId(name, intakeValue) {
    const existing = findModuleByName(name);
    if (existing) return existing._id || existing.id;

    const payload = {
      name: name.trim(),
      intake: intakeValue?.trim() || undefined,
    };

    const res = await fetchWithAuth("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await safeJson(res);
    if (!res.ok || body.success === false) {
      throw new Error(body.message || body.__raw || "Failed to create module");
    }

    return body.data._id || body.data.id;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) return setError("Please provide a title.");
    if (!moduleName.trim()) return setError("Please provide a module name.");
    if (!deadline) return setError("Please select a deadline.");

    setLoading(true);

    try {
      const moduleId = await ensureModuleId(moduleName, intake);

      const payload = {
        title: title.trim(),
        module: moduleId,
        deadline: new Date(deadline).toISOString(),
        details: details.trim() || undefined,
      };

      const res = await fetchWithAuth("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(res);
      if (!res.ok || body.success === false) {
        throw new Error(body.message || body.__raw || "Failed to create assignment");
      }

      setSuccess("Assignment created");
      if (onCreated) onCreated(body.data);

      setTitle("");
      setModuleName("");
      setIntake("");
      setDeadline("");
      setDetails("");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 2200);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6"
      aria-label="Create assignment"
    >
            <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Create Assignment
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add an assignment and link it to a module.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onCancel && onCancel()}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close assignment form"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., DB Assignment 2"
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module name
          </label>
          <input
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="e.g., Database Systems"
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          <p className="text-xs text-gray-400 mt-2">
            Type a module name. A new module will be created if none exists.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intake
          </label>
          <input
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            placeholder="e.g., 2026"
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Optional notes for the class or problems"
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="min-h-[1.25rem]">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && success && <p className="text-sm text-green-600">{success}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onCancel && onCancel()}
            className="px-4 py-2 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 border border-transparent shadow-sm"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
          >
            {loading ? "Creating..." : "Create Assignment"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AssignmentForm;