import { useState, useEffect } from "react";

function AssignmentEditForm({
  assignment = {},
  modules = [],
  onUpdated,
  onCancel,
}) {
  const [title, setTitle] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [intake, setIntake] = useState("");
  const [deadline, setDeadline] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!assignment) return;

    setTitle(assignment.title || "");

    const mod = assignment.module || {};
    setModuleName((mod && (mod.name || mod)) || "");
    setIntake((mod && mod.intake) || "");
    setDeadline(
      assignment.deadline
        ? new Date(assignment.deadline).toISOString().slice(0, 16)
        : ""
    );
    setDetails(assignment.details || "");
    setError("");
  }, [assignment]);

  async function safeJson(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { __raw: text };
    }
  }

  async function ensureModuleId(name, intakeValue) {
    const found =
      modules.find(
        (m) => (m.name || "").toLowerCase() === name.trim().toLowerCase()
      ) || null;

    if (found) return found._id || found.id;

    const payload = {
      name: name.trim(),
      intake: intakeValue?.trim() || undefined,
    };

    const res = await fetch("/api/modules", {
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

      const res = await fetch(
        `/api/assignments/${assignment._id || assignment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const body = await safeJson(res);
      if (!res.ok || body.success === false) {
        throw new Error(
          body.message || body.__raw || "Failed to update assignment"
        );
      }

      if (onUpdated) onUpdated(body.data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6"
      aria-label="Edit assignment"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Edit Assignment</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Module name
          </label>
          <input
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intake
          </label>
          <input
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Details
          </label>
          <textarea
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-200 px-3 py-2"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onCancel && onCancel()}
          className="px-4 py-2 bg-white border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default AssignmentEditForm;