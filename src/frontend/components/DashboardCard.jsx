function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

        <div className="text-slate-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;