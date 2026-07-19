export default function DashboardCard({ title, value, icon, description }) {
  return (
    <div className="bg-[#161618] border border-gray-800 p-6 rounded-2xl flex items-center justify-between text-white shadow-sm">
      <div className="space-y-2">
        <span className="text-sm font-semibold text-gray-400 block">{title}</span>
        <h3 className="text-3xl font-extrabold tracking-tight text-white">{value}</h3>
        {description && (
          <p className="text-xs text-gray-500 font-medium">{description}</p>
        )}
      </div>
      <div className="p-4 bg-zinc-800/40 text-red-500 rounded-2xl">
        {icon}
      </div>
    </div>
  );
}
