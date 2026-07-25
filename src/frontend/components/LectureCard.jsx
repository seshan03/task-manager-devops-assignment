function LectureCard({ lecture }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {lecture.module}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {lecture.topic}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          Upcoming
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>
          {lecture.date}
        </p>

        <p>
          {lecture.time}
        </p>
      </div>
    </div>
  );
}

export default LectureCard;