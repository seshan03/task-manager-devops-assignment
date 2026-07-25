function AssignmentCard({ assignment }) {
  const moduleName =
    assignment.moduleName ??
    (assignment.module && typeof assignment.module === "object"
      ? assignment.module.name
      : assignment.module ?? "Unknown module");

  const deadlineStr = assignment.deadline ?? "";

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
        Module: {moduleName}
      </p>

      <p className="text-sm text-gray-600 mt-2">
        Deadline: {deadlineStr}
      </p>
    </div>
  );
}

export default AssignmentCard;

