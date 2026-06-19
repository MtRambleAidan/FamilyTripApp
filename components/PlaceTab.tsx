import type { PlaceItem } from "@/types/trip";

type PlaceTabProps = {
  placeTypes: string[];
  placeStatuses: string[];

  selectedPlaceType: string;
  setSelectedPlaceType: (value: string) => void;

  selectedPlaceStatus: string;
  setSelectedPlaceStatus: (value: string) => void;

  visiblePlaces: PlaceItem[];

  newPlaceName: string;
  setNewPlaceName: (value: string) => void;

  newPlaceType: string;
  setNewPlaceType: (value: string) => void;

  newPlaceStatus: string;
  setNewPlaceStatus: (value: string) => void;

  newPlaceArea: string;
  setNewPlaceArea: (value: string) => void;

  newPlaceMapUrl: string;
  setNewPlaceMapUrl: (value: string) => void;

  newPlaceMemo: string;
  setNewPlaceMemo: (value: string) => void;

  editingPlaceId: number | null;

  addPlace: () => void;
  cancelEditPlace: () => void;

  startEditPlace: (item: PlaceItem) => void;
  deletePlace: (id: number, name: string) => void;
  changePlaceStatus: (id: number) => void;
};

export default function PlaceTab({
    placeTypes,
    placeStatuses,
    selectedPlaceType,
    setSelectedPlaceType,
    selectedPlaceStatus,
    setSelectedPlaceStatus,
    visiblePlaces,
    newPlaceName,
    setNewPlaceName,
    newPlaceType,
    setNewPlaceType,
    newPlaceStatus,
    setNewPlaceStatus,
    newPlaceArea,
    setNewPlaceArea,
    newPlaceMapUrl,
    setNewPlaceMapUrl,
    newPlaceMemo,
    setNewPlaceMemo,
    editingPlaceId,
    addPlace,
    cancelEditPlace,
    startEditPlace,
    deletePlace,
    changePlaceStatus,
    }: PlaceTabProps) {
    return (
        <div>
        <div className="mb-3 flex gap-2 overflow-x-auto">
            {placeTypes.map((type) => (
            <button
                key={type}
                onClick={() => setSelectedPlaceType(type)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                selectedPlaceType === type
                    ? "bg-orange-500 text-white"
                    : "bg-white text-slate-700"
                }`}
            >
                {type}
            </button>
            ))}
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto">
            {placeStatuses.map((status) => (
            <button
                key={status}
                onClick={() => setSelectedPlaceStatus(status)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                selectedPlaceStatus === status
                    ? "bg-gray-800 text-white"
                    : "bg-white text-slate-700"
                }`}
            >
                {status}
            </button>
            ))}
        </div>

        <div className="mb-4 rounded-xl border border-slate-300 bg-white p-4 shadow-md">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
            {editingPlaceId !== null ? "장소 수정" : "장소 추가"}
            </h3>

            <input
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
            placeholder="장소 이름"
            className="mb-2 w-full rounded-lg border p-2"
            />

            <input
            value={newPlaceMapUrl}
            onChange={(e) => setNewPlaceMapUrl(e.target.value)}
            placeholder="구글맵 링크 붙여넣기"
            className="mb-2 w-full rounded-lg border p-2"
            />

            <div className="mb-2 grid grid-cols-2 gap-2">
            <select
                value={newPlaceType}
                onChange={(e) => setNewPlaceType(e.target.value)}
                className="rounded-lg border p-2"
            >
                <option>맛집</option>
                <option>마사지</option>
                <option>관광지</option>
                <option>쇼핑</option>
                <option>교통</option>
            </select>

            <select
                value={newPlaceStatus}
                onChange={(e) => setNewPlaceStatus(e.target.value)}
                className="rounded-lg border p-2"
            >
                <option>후보</option>
                <option>확정</option>
                <option>예약완료</option>
                <option>방문완료</option>
            </select>
            </div>

            <input
            value={newPlaceArea}
            onChange={(e) => setNewPlaceArea(e.target.value)}
            placeholder="지역 예: 푸켓, 싱가포르"
            className="mb-2 w-full rounded-lg border p-2"
            />

            <textarea
            value={newPlaceMemo}
            onChange={(e) => setNewPlaceMemo(e.target.value)}
            placeholder="메모"
            className="mb-3 w-full rounded-lg border p-2"
            />

            <div className="flex gap-2">
            <button
                onClick={addPlace}
                className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-white"
            >
                {editingPlaceId !== null ? "장소 수정 완료" : "장소 저장"}
            </button>

            {editingPlaceId !== null && (
                <button
                onClick={cancelEditPlace}
                className="rounded-lg bg-gray-400 px-4 py-2 text-white"
                >
                취소
                </button>
            )}
            </div>
        </div>

        <div className="space-y-3">
            {visiblePlaces.map((item) => (
            <div
                key={item.id}
                className="rounded-xl border border-slate-300 bg-white p-4 shadow-md"
            >
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-orange-600">
                        {item.type}
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "방문완료"
                            ? "bg-green-100 text-green-700"
                            : item.status === "예약완료"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "확정"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {item.status}
                    </span>
                    </div>

                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>

                <p className="mt-1 text-sm font-medium text-slate-600">
                {item.area}
                </p>
                <p className="mt-2 font-medium text-slate-800">{item.memo}</p>

                <div className="mt-3 flex gap-2">
                <button
                    onClick={() => startEditPlace(item)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                >
                    수정
                </button>

                <a
                    href={item.mapUrl}
                    target="_blank"
                    className="rounded-lg bg-orange-500 px-3 py-2 text-sm text-white"
                >
                    구글맵 열기
                </a>

                <button
                    onClick={() => deletePlace(item.id, item.name)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                >
                    삭제
                </button>

                <button
                    onClick={() => changePlaceStatus(item.id)}
                    className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white"
                >
                    상태 변경
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }