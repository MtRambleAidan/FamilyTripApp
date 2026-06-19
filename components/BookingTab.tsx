import type { BookingItem } from "@/types/trip";

type BookingTabProps = {
  bookingTypes: string[];
  selectedBookingType: string;
  setSelectedBookingType: (type: string) => void;

  visibleBookings: BookingItem[];

  newBookingType: string;
  setNewBookingType: (value: string) => void;
  newBookingTitle: string;
  setNewBookingTitle: (value: string) => void;
  newBookingDate: string;
  setNewBookingDate: (value: string) => void;
  newBookingFamily: string;
  setNewBookingFamily: (value: string) => void;
  newBookingStatus: string;
  setNewBookingStatus: (value: string) => void;
  newBookingDetail: string;
  setNewBookingDetail: (value: string) => void;

  editingBookingId: number | null;
  addBooking: () => void;
  cancelEditBooking: () => void;
  startEditBooking: (item: BookingItem) => void;
  changeBookingStatus: (id: number) => void;
  deleteBooking: (id: number, title: string) => void;
};

export default function BookingTab({
  bookingTypes,
  selectedBookingType,
  setSelectedBookingType,
  visibleBookings,
  newBookingType,
  setNewBookingType,
  newBookingTitle,
  setNewBookingTitle,
  newBookingDate,
  setNewBookingDate,
  newBookingFamily,
  setNewBookingFamily,
  newBookingStatus,
  setNewBookingStatus,
  newBookingDetail,
  setNewBookingDetail,
  editingBookingId,
  addBooking,
  cancelEditBooking,
  startEditBooking,
  changeBookingStatus,
  deleteBooking,
}: BookingTabProps) {
    const hotelTimelineDates = [
        "1/10",
        "1/11",
        "1/12",
        "1/13",
        "1/14",
        "1/15",
        "1/16",
        "1/17",
        "1/18",
        "1/19",
    ];

    const getDatesBetween = (start: string, end: string) => {
        const result: string[] = [];

        const [startMonth, startDay] = start.split("/").map(Number);
        const [endMonth, endDay] = end.split("/").map(Number);

        for (let day = startDay; day <= endDay; day++) {
            result.push(`${startMonth}/${day}`);
        }

        return result;
    };

    const parseBookingDateRange = (date: string) => {
        const cleaned = date.replaceAll(" ", "");

        if (cleaned.includes("~")) {
            const [start, end] = cleaned.split("~");
            return {
            start,
            end,
            };
        }

        return {
            start: cleaned,
            end: cleaned,
        };
    };

    const hotelBookings = visibleBookings.filter(
        (booking) => booking.type === "호텔"
    );

    const hotelTimeline = ["은희네", "수현이네"].map((family) => {
        const stays: Record<string, string> = {};

        hotelTimelineDates.forEach((date) => {
            stays[date] = "미정";
        });

        hotelBookings
            .filter(
            (booking) =>
                booking.family === family || booking.family === "전체"
            )
            .forEach((booking) => {
            const { start, end } = parseBookingDateRange(booking.date);
            const stayDates = getDatesBetween(start, end);

            stayDates.forEach((date) => {
                if (stays[date]) {
                stays[date] = booking.status;
                }
            });
            });

        return {
            family,
            stays,
        };
    });



    const getStayStyle = (
        date: string,
        start: string,
        end: string,
        status: string
    ) => {
        const color =
            status === "예약완료"
            ? "#7c3aed" // purple-600
            : status === "예약대기"
            ? "#c4b5fd" // purple-200
            : null;

        if (!color) {
            return {
            backgroundColor: "white",
            border: "1px solid #cbd5f5",
            };
        }

        if (date === start) {
            // 체크인 → 아래 반
            return {
            background: `linear-gradient(to top, ${color} 50%, white 50%)`,
            };
        }

        if (date === end) {
            // 체크아웃 → 위 반
            return {
            background: `linear-gradient(to bottom, ${color} 50%, white 50%)`,
            };
        }

        return {
            backgroundColor: color,
        };
    };

    const getStayRadius = (
        date: string,
        start: string,
        end: string
        ) => {
        if (date === start && date === end) {
            return "rounded-md"; // 하루짜리
        }

        if (date === start) {
            return "rounded-l-md"; // 시작
        }

        if (date === end) {
            return "rounded-r-md"; // 끝
        }

        return "rounded-none"; // 중간
    };

    const getFamilyColor = (family: string, status: string) => {
        if (family === "은희네") {
            return status === "예약완료"
            ? "#7c3aed"   // 보라 진함
            : "#c4b5fd";  // 보라 연함
        }

        if (family === "수현이네") {
            return status === "예약완료"
            ? "#2563eb"   // 파랑 진함
            : "#93c5fd";  // 파랑 연함
        }

        return "#e5e7eb";
    };


  return (
    <div>
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {bookingTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedBookingType(type)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm ${
              selectedBookingType === type
                ? "bg-purple-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mb-4 rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="mb-3 text-lg font-bold text-slate-900">호텔 예약 현황</h3>

        <div className="overflow-x-auto">
            <div className="min-w-[720px]">
            <div className="ml-20 grid grid-cols-10 gap-1">
                {hotelTimelineDates.map((date) => (
                <div
                    key={date}
                    className="text-center text-xs font-bold text-slate-600"
                >
                    {date}
                </div>
                ))}
            </div>

            <div className="mt-2 space-y-2">
                {hotelTimeline.map((row) => (
                <div key={row.family} className="flex items-center gap-2">
                    <div className="w-18 shrink-0 text-sm font-bold text-slate-800">
                    {row.family}
                    </div>

                    <div className="grid flex-1 grid-cols-10 gap-1">
                        {hotelTimelineDates.map((date) => {
                            const bookings = hotelBookings.filter((b) => {
                                if (!(b.family === row.family || b.family === "전체")) return false;

                                const { start, end } = parseBookingDateRange(b.date);
                                return (
                                    getDatesBetween(start, end).includes(date) ||
                                    date === start ||
                                    date === end
                                );
                            });

                            let radiusClass = "rounded-md";
                            let styleObj: React.CSSProperties = {
                                backgroundColor: "white",
                                border: "1px solid #cbd5f5",
                            };

                            if (bookings.length > 0) {
                                let hasTop = false;
                                let hasBottom = false;
                                let isMiddle = false;

                                let color = "#7c3aed"; // 기본 (나중에 덮어씀)

                                bookings.forEach((booking) => {
                                    const { start, end } = parseBookingDateRange(booking.date);
                                    color = getFamilyColor(row.family, booking.status);

                                    if (date === start && date === end) {
                                    isMiddle = true;
                                    } else if (date === start) {
                                    hasBottom = true;
                                    } else if (date === end) {
                                    hasTop = true;
                                    } else {
                                    isMiddle = true;
                                    }

                                    radiusClass = getStayRadius(date, start, end);
                                });

                                // 👉 여기서 최종 결정
                                if (isMiddle || (hasTop && hasBottom)) {
                                    styleObj = { backgroundColor: color }; // FULL
                                } else if (hasBottom) {
                                    styleObj = {
                                        background: `linear-gradient(to top, ${color} 50%, white 50%)`,
                                    };
                                } else if (hasTop) {
                                    styleObj = {
                                        background: `linear-gradient(to bottom, ${color} 50%, white 50%)`,
                                    };
                                }
                            }

                            return (
                            <div
                                key={date}
                                className={`h-8 ${radiusClass}`}
                                style={styleObj}
                            />
                            );
                        })}
                        </div>
                </div>
                ))}
            </div>

            <div className="mt-3 flex gap-3 text-xs font-medium text-slate-600">
                <span>■ 예약완료</span>
                <span>■ 예약대기</span>
                <span>□ 미정</span>
            </div>
            </div>
        </div>
        </div>

      <div className="mb-4 rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="mb-3 text-lg font-bold text-slate-900">
          {editingBookingId !== null ? "예약 수정" : "예약 추가"}
        </h3>

        <div className="mb-2 grid grid-cols-2 gap-2">
          <select
            value={newBookingType}
            onChange={(e) => setNewBookingType(e.target.value)}
            className="rounded-lg border p-2"
          >
            <option>항공권</option>
            <option>호텔</option>
            <option>차량</option>
            <option>마사지</option>
            <option>액티비티</option>
          </select>

          <select
            value={newBookingFamily}
            onChange={(e) => setNewBookingFamily(e.target.value)}
            className="rounded-lg border p-2"
          >
            <option>전체</option>
            <option>수현이네</option>
            <option>은희네</option>
          </select>
        </div>

        <input
          value={newBookingTitle}
          onChange={(e) => setNewBookingTitle(e.target.value)}
          placeholder="예약 제목 예: 푸켓 숙소"
          className="mb-2 w-full rounded-lg border p-2"
        />

        <input
          value={newBookingDate}
          onChange={(e) => setNewBookingDate(e.target.value)}
          placeholder="날짜 예: 1월 13일 ~ 1월 17일"
          className="mb-2 w-full rounded-lg border p-2"
        />

        <select
          value={newBookingStatus}
          onChange={(e) => setNewBookingStatus(e.target.value)}
          className="mb-2 w-full rounded-lg border p-2"
        >
          <option>후보</option>
          <option>예약대기</option>
          <option>예약완료</option>
          <option>취소</option>
        </select>

        <textarea
          value={newBookingDetail}
          onChange={(e) => setNewBookingDetail(e.target.value)}
          placeholder="예약 상세 내용"
          className="mb-3 w-full rounded-lg border p-2"
        />

        <div className="flex gap-2">
          <button
            onClick={addBooking}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white"
          >
            {editingBookingId !== null ? "예약 수정 완료" : "예약 저장"}
          </button>

          {editingBookingId !== null && (
            <button
              onClick={cancelEditBooking}
              className="rounded-lg bg-gray-400 px-4 py-2 text-white"
            >
              취소
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {visibleBookings.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-300 bg-white p-4 shadow-md"
          >
            <div className="mb-1 text-sm font-medium text-purple-600">
              {item.type}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {item.date}
            </p>
            <p className="mt-2 font-medium text-slate-800">{item.detail}</p>
            <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">
                    적용 가족: {item.family ?? "전체"}
                </span>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.status === "예약완료"
                        ? "bg-green-100 text-green-700"
                        : item.status === "예약대기"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "취소"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                >
                    {item.status}
                </span>
                </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => startEditBooking(item)}
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white"
              >
                수정
              </button>

              <button
                onClick={() => changeBookingStatus(item.id)}
                className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white"
              >
                상태 변경
              </button>

              <button
                onClick={() => deleteBooking(item.id, item.title)}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}