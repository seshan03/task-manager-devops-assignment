import { useState, useEffect } from "react";

function LectureForm({ modules = [], lectureId, onSuccess, onCancel }) {
  const [moduleName, setModuleName] = useState("");
  const [topic, setTopic] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (lectureId) {
      setIsEditMode(true);
      fetchExistingLecture(lectureId);
    } else {
      setIsEditMode(false);
      setModuleName("");
      setTopic("");
      setDateTime("");
      setError("");
    }
  }, [lectureId]);

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

  async function fetchExistingLecture(id) {
    try {
      const res = await fetch(`/api/lectures/${id}`);
      const body = await safeJson(res);

      if (res.ok && body.data) {
        const lecture = body.data;
        setModuleName(lecture.module?.name || "");
        setTopic(lecture.topic || "");

        const dt = new Date(lecture.dateTime);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        setDateTime(dt.toISOString().slice(0, 16));
      } else {
        setError(body.message || "Failed to load lecture");
      }
    } catch {
      setError("Failed to load lecture");
    }
  }

  async function ensureModuleId(name) {
    const existing = findModuleByName(name);
    if (existing) return existing._id || existing.id;

    const res = await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
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

    if (!moduleName.trim()) return setError("Please provide a module name.");
    if (!topic.trim()) return setError("Please provide a lecture topic.");
    if (!dateTime) return setError("Please select a date and time.");

    setLoading(true);

    try {
      const moduleId = await ensureModuleId(moduleName);

      const payload = {
        module: moduleId,
        topic: topic.trim(),
        dateTime: new Date(dateTime).toISOString(),
      };

      const endpoint = isEditMode
        ? `/api/lectures/${lectureId}`
        : "/api/lectures";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(res);
      if (!res.ok || body.success === false) {
        throw new Error(body.message || body.__raw || "Failed to save lecture");
      }

      setSuccess(isEditMode ? "Lecture updated" : "Lecture created");

      if (onSuccess) onSuccess(body.data);

      if (!isEditMode) {
        setModuleName("");
        setTopic("");
        setDateTime("");
      }
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
      aria-label={isEditMode ? "Edit lecture" : "Create lecture"}
    >
            <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditMode ? "Edit Lecture" : "Create Lecture"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? "Update lecture details."
              : "Add a lecture and link it to a module."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onCancel && onCancel()}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close lecture form"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Module Name
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Database Normalization"
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full rounded-md bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="min-h-[1.25rem]">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && success && (
            <p className="text-sm text-green-600">{success}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onCancel && onCancel()}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Lecture"
              : "Create Lecture"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default LectureForm;