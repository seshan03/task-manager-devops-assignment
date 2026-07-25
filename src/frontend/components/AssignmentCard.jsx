function AssignmentCard({ assignment }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {assignment.title}
        </h3>

        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
          {assignment.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Module: {assignment.module}
      </p>

      <p className="text-sm text-gray-600 mt-2">
        Deadline: {assignment.deadline}
      </p>
    </div>
  );
}

export default AssignmentCard;