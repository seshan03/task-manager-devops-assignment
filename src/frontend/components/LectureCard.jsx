import { useState } from "react";
import { Pencil, Trash2, Check } from "lucide-react";

function LectureCard({ lecture, onEdit, onComplete, onRequestDelete }) {

  const [completing, setCompleting] = useState(false);
  const isCompleted = lecture.status === "Completed";

  const moduleName =
    lecture.moduleName ??
    (lecture.module && typeof lecture.module === "object"
      ? lecture.module.name
      : lecture.module ?? "Unknown module");

  const dateStr = lecture.date ?? "";
  const timeStr = lecture.time ?? "";

  async function handleMarkAsDone() {
  setCompleting(true);

    try {
      const res = await fetch(`/api/lectures/${lecture._id || lecture.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
    });

    const body = await res.json().catch(() => ({ __raw: "" }));

    if (!res.ok || body.success === false) {
      throw new Error(body.message || "Failed to mark lecture as done");
    }

    if (onComplete) onComplete(body.data);
  } catch (err) {
    alert("Unable to mark lecture as done: " + (err.message || err));
  } finally {
    setCompleting(false);
  }
}

  return (
    <div className="rounded-xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{moduleName}</h3>
          <p className="mt-1 text-sm text-slate-500">{lecture.topic}</p>
        </div>

                  <span
          className={`rounded-full px-3 py-1 text-xs ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : "bg-sky-100 text-sky-700"
          }`}
        >
          {isCompleted ? "Completed" : "Upcoming"}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p>{dateStr}</p>
        <p>{timeStr}</p>
      </div>


      <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
        {!isCompleted && (
          <button
              type="button"
              onClick={handleMarkAsDone}
              disabled={completing}
              className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Check size={16} aria-hidden="true" />
            {completing ? "Updating..." : "Mark as done"}
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit && onEdit(lecture)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Pencil size={16} aria-hidden="true" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onRequestDelete && onRequestDelete(lecture)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
          <Trash2 size={16} aria-hidden="true" />
          Delete
        </button>

              

      </div>
    </div>
  );
}

export default LectureCard;