import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import LectureCard from "../components/LectureCard";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentEditForm from "../components/AssignmentEditForm";
import LectureForm from "../components/LectureForm";

import { fetchWithAuth } from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  CalendarDays,
  ClipboardList,
  BellRing,
} from "lucide-react";

function LecturerDashboard() {
  const { logout } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);
  const [showLectureForm, setShowLectureForm] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);

  const [deleteAssignmentItem, setDeleteAssignmentItem] = useState(null);
  const [deleteLectureItem, setDeleteLectureItem] = useState(null);

function mapLecture(lecture) {
    return {
      _id: lecture._id || lecture.id,
      topic: lecture.topic || lecture.title || "",
      module:
        lecture.module && (lecture.module.name || lecture.module)
          ? lecture.module.name || lecture.module
          : "",
      date: lecture.dateTime
        ? new Date(lecture.dateTime).toLocaleDateString()
        : lecture.date || "",
      time: lecture.dateTime
        ? new Date(lecture.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : lecture.time || "",
      status: lecture.status || "Pending",
    };
  
  }

  function mapAssignment(assignment) {
    return {
      ...assignment,
      _id: assignment._id || assignment.id,
      status: assignment.status || "Pending",
    };
  }

  async function fetchData() {
    setLoading(true);

    try {
      const [modsRes, lectRes, asgRes] = await Promise.all([
        fetchWithAuth("/api/modules"),
        fetchWithAuth("/api/lectures"),
        fetchWithAuth("/api/assignments"),
      ]);

      const mods = await modsRes.json();
      const lects = await lectRes.json();
      const asgs = await asgRes.json();

      setModules(Array.isArray(mods?.data) ? mods.data : []);
      setLectures(Array.isArray(lects?.data) ? lects.data.map(mapLecture) : []);
      setAssignments(
        Array.isArray(asgs?.data) ? asgs.data.map(mapAssignment) : []
      );
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchLectures() {
    try {
      const lectRes = await fetchWithAuth("/api/lectures");
      const lects = await lectRes.json();
      setLectures(Array.isArray(lects?.data) ? lects.data.map(mapLecture) : []);
    } catch (err) {
      console.error("Failed to fetch lectures", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleAssignmentCreated() {
    setShowAssignmentForm(false);
    fetchData();
  }

  function handleEditClick(assignment) {
    setEditAssignment(assignment);
    setShowAssignmentForm(false);
    setShowLectureForm(false);
    setEditingLecture(null);
  }

  function handleAssignmentUpdated() {
    setEditAssignment(null);
    fetchData();
  }

  function handleAssignmentDeleted() {
    fetchData();
  }

  function handleAssignmentCompleted() {
    fetchData();
  }

  function openLectureCreate() {
    setShowLectureForm(true);
    setEditingLecture(null);
    setEditAssignment(null);
    setShowAssignmentForm(false);
  }

  function openLectureEdit(lecture) {
    setEditingLecture(lecture);
    setShowLectureForm(false);
    setEditAssignment(null);
    setShowAssignmentForm(false);
  }

  function closeLectureModal() {
    setShowLectureForm(false);
    setEditingLecture(null);
  }

  function closeAssignmentCreate() {
    setShowAssignmentForm(false);
  }

    function requestAssignmentDelete(assignment) {
    setDeleteAssignmentItem(assignment);
    setDeleteLectureItem(null);
  }

  function requestLectureDelete(lecture) {
    setDeleteLectureItem(lecture);
    setDeleteAssignmentItem(null);
  }

  async function confirmAssignmentDelete() {
    if (!deleteAssignmentItem) return;
    try {
      const res = await fetchWithAuth(`/api/assignments/${deleteAssignmentItem._id || deleteAssignmentItem.id}`, {
        method: "DELETE",
      });
      const body = await res.json().catch(() => ({ __raw: "" }));
      if (!res.ok || body.success === false) {
        throw new Error(body.message || "Failed to delete assignment");
      }
      setDeleteAssignmentItem(null);
      fetchData();
    } catch (err) {
      alert("Unable to delete assignment: " + (err.message || err));
    }
  }

  async function confirmLectureDelete() {
    if (!deleteLectureItem) return;
    try {
      const res = await fetchWithAuth(`/api/lectures/${deleteLectureItem._id || deleteLectureItem.id}`, {
        method: "DELETE",
      });
      const body = await res.json().catch(() => ({ __raw: "" }));
      if (!res.ok || body.success === false) {
        throw new Error(body.message || "Failed to delete lecture");
      }
      setDeleteLectureItem(null);
      fetchData();
    } catch (err) {
      alert("Unable to delete lecture: " + (err.message || err));
    }
  }

  function closeAssignmentEdit() {
    setEditAssignment(null);
  }

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 text-slate-900">
      <div className="max-w-7xl mx-auto">
                <div className="mb-8 rounded-3xl border border-white/70 bg-white/65 p-6 shadow-lg backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Lecturer Teaching Companion
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Welcome back, here is your teaching overview.
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-slate-900">
          <DashboardCard
            title="Upcoming Lectures"
            value={lectures.length}
            icon={<CalendarDays size={32} />}
          />
          <DashboardCard
            title="Pending Assignments"
            value={pendingAssignments}
            icon={<ClipboardList size={32} />}
          />
          <DashboardCard
            title="Active Reminders"
            value="Coming soon"
            icon={<BellRing size={32} />}
          />
        </div>

        <section className="mt-8 lg:mt-12 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Upcoming Lectures
            </h2>

            {!showLectureForm && !editingLecture && (
              <button
                className="inline-flex w-40 items-center justify-center rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:from-sky-700 hover:to-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                onClick={openLectureCreate}
              >
                + New Lecture
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {loading ? (
              <p>Loading lectures...</p>
            ) : lectures.length ? (
              lectures.map((lecture) => (
                <LectureCard
                  key={lecture._id}
                  lecture={lecture}
                  onEdit={openLectureEdit}
                  onDelete={fetchLectures}
                  onRequestDelete={requestLectureDelete}
                  onComplete={fetchData}
                />
              ))
            ) : (
              <p className="text-gray-500">No upcoming lectures.</p>
            )}
          </div>
        </section>

        {(showLectureForm || editingLecture) && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <LectureForm
              modules={modules}
              lectureId={editingLecture?._id}
              onSuccess={() => {
                closeLectureModal();
                fetchData();
              }}
              onCancel={closeLectureModal}
            />
          </div>
        )}

        <section className="mt-16 mb-16">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold whitespace-nowrap text-gray-800">
              Assigned Task
            </h2>

            {!showAssignmentForm && !editAssignment && (
              <button
                className="inline-flex w-40 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                onClick={() => {
  setShowAssignmentForm(true);
  setShowLectureForm(false);
  setEditingLecture(null);
}}
              >
                + New Assignment
              </button>
            )}
          </div>

          {showAssignmentForm && (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
    <AssignmentForm
      modules={modules}
      onCreated={handleAssignmentCreated}
      onCancel={closeAssignmentCreate}
    />
  </div>
)}

         {editAssignment && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
              <AssignmentEditForm
                assignment={editAssignment}
                modules={modules}
                onUpdated={handleAssignmentUpdated}
                onCancel={closeAssignmentEdit}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {loading ? (
              <p>Loading assignments...</p>
            ) : assignments.length ? (
              assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  onEdit={handleEditClick}
                  onComplete={handleAssignmentCompleted}
                 onDelete={handleAssignmentDeleted}
                 onRequestDelete={requestAssignmentDelete}
                />
              ))
            ) : (
              <p className="text-gray-500">No assignments found.</p>
            )}
                        
          </div>
        </section>

        {(deleteAssignmentItem || deleteLectureItem) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                {deleteAssignmentItem ? "Delete Assignment?" : "Delete Lecture?"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteAssignmentItem(null);
                    setDeleteLectureItem(null);
                  }}
                  className="w-24 rounded-md border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={
                    deleteAssignmentItem
                      ? confirmAssignmentDelete
                      : confirmLectureDelete
                  }
                  className="w-24 rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  

 export default LecturerDashboard;
