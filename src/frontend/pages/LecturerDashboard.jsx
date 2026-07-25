import DashboardCard from "../components/DashboardCard";
import LectureCard from "../components/LectureCard";
import AssignmentCard from "../components/AssignmentCard";

function LecturerDashboard() {
  const lectures = [
    {
      id: 1,
      module: "Database Systems",
      topic: "Normalization and BCNF",
      date: "Tomorrow",
      time: "09:00 AM",
    },
    {
      id: 2,
      module: "Software Engineering",
      topic: "Design Patterns",
      date: "Friday",
      time: "10:30 AM",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Database Assignment 2",
      module: "Database Systems",
      deadline: "01 August 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "SE Group Project",
      module: "Software Engineering",
      deadline: "05 August 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Lecturer Teaching Companion
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, here is your teaching overview.
          </p>
        </div>


        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <DashboardCard
            title="Upcoming Lectures"
            value={lectures.length}
            icon="📚"
          />

          <DashboardCard
            title="Pending Assignments"
            value={assignments.length}
            icon="📝"
          />

          <DashboardCard
            title="Reminders"
            value="3"
            icon="🔔"
          />

        </div>


        {/* Lectures Section */}
        <section className="mb-8">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Lectures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {lectures.map((lecture) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
              />
            ))}

          </div>

        </section>


        {/* Assignment Section */}
        <section>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Assignment Promises
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
              />
            ))}

          </div>

        </section>


      </div>
    </div>
  );
}

export default LecturerDashboard;