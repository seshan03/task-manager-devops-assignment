import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";

function AssignmentCard({ assignment, onEdit, onComplete, onRequestDelete }) {
  
  const [completing, setCompleting] = useState(false);

  const deadline = assignment.deadline
    ? new Date(assignment.deadline).toLocaleString()
    : "No deadline";

  const isCompleted = assignment.status === "Completed";
  const moduleName =
    assignment.module && typeof assignment.module === "object"
      ? assignment.module.name
      : assignment.module || "Unknown module";

  async function handleMarkAsDone() {
    setCompleting(true);

    try {
      const response = await fetch(
        `/api/assignments/${assignment._id || assignment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed" }),
        }
      );

      const body = await response.json().catch(() => ({ __raw: "" }));

      if (!response.ok || body.success === false) {
        throw new Error(body.message || "Failed to mark assignment as done");
      }

      if (onComplete) {
        onComplete(body.data);
      }
    } catch (error) {
      alert("Unable to mark assignment as done: " + (error.message || error));
    } finally {
      setCompleting(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {assignment.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">Module: {moduleName}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {assignment.status || "Pending"}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-600">Deadline: {deadline}</p>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
        {!isCompleted && (
          <button
            type="button"
            onClick={handleMarkAsDone}
            disabled={completing}
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Check size={16} aria-hidden="true" />
            {completing ? "Updating..." : "Mark as done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onEdit && onEdit(assignment)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Pencil size={16} aria-hidden="true" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onRequestDelete && onRequestDelete(assignment)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >   
          <Trash2 size={16} aria-hidden="true" />
            Delete
        </button>
      </div>

            
    </div>
  );
}



export default AssignmentCard;
