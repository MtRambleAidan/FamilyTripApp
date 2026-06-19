type HomeTabProps = {
  today: Date;
  suhyunDDay: number;
  eunheeDDay: number;
  meetDDay: number;
  preparationRate: number;
  requiredPreparationItems: string[];
  completedPreparationItems: string[];
  getPreparationStatus: (item: string) => string;
};

export default function HomeTab({
  today,
  suhyunDDay,
  eunheeDDay,
  meetDDay,
  preparationRate,
  requiredPreparationItems,
  completedPreparationItems,
  getPreparationStatus,
}: HomeTabProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">오늘</h3>
        <p className="mt-2 font-medium text-slate-800">
          {today.toLocaleDateString("ko-KR")}
        </p>
      </div>

      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">여행까지 남은 날짜</h3>
        <p className="mt-2 font-medium text-slate-800">수현이네 출발까지 D-{suhyunDDay}</p>
        <p className="font-medium text-slate-800">은희네 출발까지 D-{eunheeDDay}</p>
        <p className="font-medium text-slate-800">푸켓 합류까지 D-{meetDDay}</p>
      </div>

      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">여행 준비도</h3>

        <div className="mt-3 h-3 rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{ width: `${preparationRate}%` }}
          />
        </div>

        <p className="mt-2 font-medium text-slate-800">{preparationRate}% 완료</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
            {requiredPreparationItems.map((item) => {
                const status = getPreparationStatus(item);

                return (
                <div
                    key={item}
                    className={`rounded-lg px-3 py-2 text-sm font-bold ${
                    status === "완료"
                        ? "bg-green-100 text-green-700"
                        : status === "진행중"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                >
                    {status} · {item}
                </div>
                );
            })}
            </div>
      </div>
    </div>
  );
}