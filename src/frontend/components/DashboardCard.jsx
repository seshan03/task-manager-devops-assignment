function DashboardCard({ title, value, icon }) {
  return (
                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-slate-700">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;