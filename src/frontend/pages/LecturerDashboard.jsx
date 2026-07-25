import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import LectureCard from "../components/LectureCard";
import AssignmentCard from "../components/AssignmentCard";

import {
CalendarDays,
ClipboardList,
BellRing,
} from "lucide-react";

function LecturerDashboard() {
const [modules, setModules] = useState([]);
const [lectures, setLectures] = useState([]);
const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
let mounted = true;

async function fetchData() {
  setLoading(true);
  setError(null);

  try {
    const base = "http://localhost:5000";
    const [modRes, lecRes, asgRes] = await Promise.all([
      fetch(`${base}/api/modules`),
      fetch(`${base}/api/lectures`),
      fetch(`${base}/api/assignments`),
    ]);

    if (!modRes.ok) throw new Error(`Modules fetch failed: ${modRes.status}`);
    if (!lecRes.ok) throw new Error(`Lectures fetch failed: ${lecRes.status}`);
    if (!asgRes.ok) throw new Error(`Assignments fetch failed: ${asgRes.status}`);

    const [modsJson, lecsJson, asgsJson] = await Promise.all([
      modRes.json(),
      lecRes.json(),
      asgRes.json(),
    ]);

    if (!mounted) return;

    setModules(Array.isArray(modsJson?.data) ? modsJson.data : []);
    setLectures(Array.isArray(lecsJson?.data) ? lecsJson.data : []);
    setAssignments(Array.isArray(asgsJson?.data) ? asgsJson.data : []);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    if (mounted) setError(err.message || "Failed to load dashboard data");
  } finally {
    if (mounted) setLoading(false);
  }
}

fetchData();

return () => {
  mounted = false;
};

}, []);

const lectureModuleName = (lecture) => {
const m = lecture.module;
if (!m) return "Unknown module";
if (typeof m === "object") return m.name || m.title || "Unknown module";
return String(m);
};

const formatDateTime = (iso) => {
if (!iso) return "";
try {
const d = new Date(iso);
if (Number.isNaN(d.getTime())) return iso;
return d.toLocaleString();
} catch {
return iso;
}
};

return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="max-w-7xl mx-auto">
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-800">
Lecturer Teaching Companion
</h1>
<p className="text-gray-500 mt-2">
Welcome back, here is your teaching overview.
</p>
</div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DashboardCard
        title="Upcoming Lectures"
        value={loading ? "…" : lectures.length}
        icon={<CalendarDays size={32} />}
      />

      <DashboardCard
        title="Pending Assignments"
        value={loading ? "…" : assignments.length}
        icon={<ClipboardList size={32} />}
      />

      <DashboardCard
        title="Active Reminders"
        value={loading ? "…" : "3"}
        icon={<BellRing size={32} />}
      />
    </div>

    {loading && (
      <div className="text-gray-600 mb-6">Loading dashboard data…</div>
    )}

    {error && (
      <div className="text-red-600 mb-6">Error: {error}</div>
    )}

    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upcoming Lectures
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lectures.length === 0 && !loading && (
          <div className="text-gray-500">No upcoming lectures found.</div>
        )}

        {lectures.map((lecture) => (
          <LectureCard
            key={lecture._id || lecture.id}
            lecture={{
              ...lecture,
              moduleName: lectureModuleName(lecture),
              date: formatDateTime(lecture.dateTime || lecture.date),
            }}
          />
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Assignment Promises
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.length === 0 && !loading && (
          <div className="text-gray-500">No assignments found.</div>
        )}

        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id || assignment.id}
            assignment={{
              ...assignment,
              moduleName:
                assignment.module?.name ||
                assignment.module ||
                "Unknown module",
              deadline: formatDateTime(assignment.deadline || assignment.dueDate),
            }}
          />
        ))}
      </div>
    </section>
  </div>
</div>

);
}

export default LecturerDashboard;