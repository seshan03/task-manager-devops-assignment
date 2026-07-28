function LectureCard({ lecture }) {
// lecture.module may be:
// - a populated object { _id, name, ... }
// - a string/id
// We prefer the precomputed lecture.moduleName if present.
const moduleName =
lecture.moduleName ??
(lecture.module && typeof lecture.module === "object"
? lecture.module.name
: lecture.module ?? "Unknown module");

// date/time may already be formatted by the caller (lecture.date)
const dateStr = lecture.date ?? "";
const timeStr = lecture.time ?? "";

return (
<div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
<div className="flex justify-between items-start">
<div>
<h3 className="text-lg font-semibold text-gray-800">
{moduleName}
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
      {dateStr}
    </p>

    <p>
      {timeStr}
    </p>
  </div>
</div>

);
}

export default LectureCard;