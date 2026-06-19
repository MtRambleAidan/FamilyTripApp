import type { ScheduleItem } from "@/types/trip";

type ScheduleTabProps = {
  families: string[];
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  visibleSchedules: ScheduleItem[];
};

export default function ScheduleTab({
  families,
  selectedFamily,
  setSelectedFamily,
  visibleSchedules,
}: ScheduleTabProps) {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {families.map((family) => (
          <button
            key={family}
            onClick={() => setSelectedFamily(family)}
            className={`rounded-full px-4 py-2 text-sm ${
              selectedFamily === family
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {family}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visibleSchedules.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-300 bg-white p-4 shadow-md"
          >
            <div className="mb-1 text-sm font-medium text-blue-600">
              {item.day}
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {item.family} · {item.memo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}