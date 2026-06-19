"use client";

import { useEffect, useState } from "react";
import HomeTab from "@/components/HomeTab"; 
import ScheduleTab from "@/components/ScheduleTab";
import BookingTab from "@/components/BookingTab";
import ExpenseTab from "@/components/ExpenseTab";
import PlaceTab from "@/components/PlaceTab";
import { schedules } from "@/data/schedules";
import { bookings } from "@/data/bookings";
import { expenses } from "@/data/expenses";
import { places } from "@/data/places";

import OpinionTab from "@/components/OpinionTab";
import { comments } from "@/data/comments";
import type { CommentItem } from "@/types/trip";



import type {
ScheduleItem,
BookingItem,
ExpenseItem,
PlaceItem,
} from "@/types/trip";

const tabs = ["홈", "일정", "예약", "비용", "장소", "의견"];
const families = ["전체", "수현이네", "은희네"];
const bookingTypes = ["전체", "항공권", "호텔", "차량", "마사지", "액티비티"];
const placeTypes = ["전체", "맛집", "마사지", "관광지", "쇼핑", "교통"];
const placeStatuses = ["전체", "후보", "확정", "예약완료", "방문완료"];



export default function Home() {
  const [activeTab, setActiveTab] = useState("홈");
  const [selectedFamily, setSelectedFamily] = useState("전체");
  const [selectedBookingType, setSelectedBookingType] = useState("전체");
  const [selectedPlaceType, setSelectedPlaceType] = useState("전체");
  const [selectedPlaceStatus, setSelectedPlaceStatus] = useState("전체");

  const [placeList, setPlaceList] = useState(places);


  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceType, setNewPlaceType] = useState("맛집");
  const [newPlaceStatus, setNewPlaceStatus] = useState("후보");
  const [newPlaceArea, setNewPlaceArea] = useState("푸켓");
  const [newPlaceMapUrl, setNewPlaceMapUrl] = useState("");
  const [newPlaceMemo, setNewPlaceMemo] = useState("");
  const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);

  const visibleSchedules = schedules.filter(
    (item) =>
      selectedFamily === "전체" ||
      item.family === "전체" ||
      item.family === selectedFamily
  );

  const [expenseList, setExpenseList] = useState(expenses);

  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const todayString = new Date().toISOString().split("T")[0];
  const [newExpenseDate, setNewExpenseDate] =
    useState(todayString);
  const expenseCategories = ["교통", "숙소", "식비", "마사지", "액티비티", "쇼핑", "기타"];
  const [newExpenseCategory, setNewExpenseCategory] = useState("기타");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCurrency, setNewExpenseCurrency] = useState("KRW");
  const [newExpenseExchangeRate, setNewExpenseExchangeRate] = useState("1");
  const [newExpensePaidBy, setNewExpensePaidBy] = useState("수현이네");
  const [newExpenseMemo, setNewExpenseMemo] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);

  const [bookingList, setBookingList] = useState(bookings);

  const [newBookingType, setNewBookingType] = useState("호텔");
  const [newBookingTitle, setNewBookingTitle] = useState("");
  const [newBookingDate, setNewBookingDate] = useState("");
  const [newBookingFamily, setNewBookingFamily] = useState("전체");
  const [newBookingStatus, setNewBookingStatus] = useState("후보");
  const [newBookingDetail, setNewBookingDetail] = useState("");
  const [editingBookingId, setEditingBookingId] = useState<number | null>(null);


  const [commentsList, setCommentsList] = useState<CommentItem[]>(comments);
  const [newCommentAuthor, setNewCommentAuthor] = useState("민수");
  const [newCommentContent, setNewCommentContent] = useState("");


  const visibleBookings = bookingList.filter(
    (item) =>
      selectedBookingType === "전체" ||
      item.type === selectedBookingType
  );

  useEffect(() => {
    const savedPlaces = localStorage.getItem("FamilyTripPlaces");

    if (savedPlaces) {
      setPlaceList(JSON.parse(savedPlaces));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FamilyTripPlaces", JSON.stringify(placeList));
  }, [placeList]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem("FamilyTripExpenses");

    if (savedExpenses) {
      setExpenseList(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FamilyTripExpenses", JSON.stringify(expenseList));
  }, [expenseList]);

  useEffect(() => {
    const savedBookings = localStorage.getItem("FamilyTripBookings");

    if (savedBookings) {
      setBookingList(JSON.parse(savedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FamilyTripBookings", JSON.stringify(bookingList));
  }, [bookingList]);

  useEffect(() => {
    const savedComments = localStorage.getItem("familiTripComments");

    if (savedComments) {
      setCommentsList(JSON.parse(savedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("familiTripComments", JSON.stringify(commentsList));
  }, [commentsList]);


  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);

  const expenseSummaryByCategory = expenseCategories.map((category) => {
    const total = expenseList
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      category,
      total,
    };
  });

  const eachFamilyShare = totalExpense / 2;

  const paidBySuhyun = expenseList
    .filter((item) => item.paidBy === "수현이네")
    .reduce((sum, item) => sum + item.amount, 0);

  const paidByEunhee = expenseList
    .filter((item) => item.paidBy === "은희네")
    .reduce((sum, item) => sum + item.amount, 0);

  const suhyunBalance = paidBySuhyun - eachFamilyShare;
  const eunheeBalance = paidByEunhee - eachFamilyShare;

  let settlementMessage = "정산할 금액이 없습니다.";

  if (suhyunBalance > 0) {
    settlementMessage = `은희네가 수현이네에게 ${Math.round(
      suhyunBalance
    ).toLocaleString()}원을 보내면 됩니다.`;
  } else if (eunheeBalance > 0) {
    settlementMessage = `수현이네가 은희네에게 ${Math.round(
      eunheeBalance
    ).toLocaleString()}원을 보내면 됩니다.`;
  }

  const today = new Date();

  const suhyunDeparture = new Date("2027-01-13");
  const eunheeDeparture = new Date("2027-01-10");
  const phuketMeetDate = new Date("2027-01-13");

  const getDDay = (targetDate: Date) => {
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const suhyunDDay = getDDay(suhyunDeparture);
  const eunheeDDay = getDDay(eunheeDeparture);
  const meetDDay = getDDay(phuketMeetDate);

  const requiredPreparationItems = [
    "항공권",
    "호텔",
    "픽업차량",
    "마사지",
    "액티비티",
    "맛집 후보",
  ];

  const getPreparationStatus = (item: string) => {
    const relatedBookings = bookingList.filter((booking) => {
      if (item === "항공권") return booking.type === "항공권";
      if (item === "호텔") return booking.type === "호텔";
      if (item === "픽업차량") return booking.type === "차량";
      if (item === "마사지") return booking.type === "마사지";
      if (item === "액티비티") return booking.type === "액티비티";
      return false;
    });

    if (item === "맛집 후보") {
      return placeList.some((place) => place.type === "맛집")
        ? "완료"
        : "미완료";
    }

    if (relatedBookings.length === 0) {
      return "미완료";
    }

    if (relatedBookings.every((booking) => booking.status === "예약완료")) {
      return "완료";
    }

    if (
      relatedBookings.some(
        (booking) => booking.status === "예약대기" || booking.status === "후보"
      )
    ) {
      return "진행중";
    }

    return "미완료";
  };

  const completedPreparationItems = requiredPreparationItems.filter(
    (item) => getPreparationStatus(item) === "완료"
  );

  const preparationRate = Math.round(
    (completedPreparationItems.length / requiredPreparationItems.length) * 100
  );


  const visiblePlaces = placeList.filter(
  (item) =>
    (selectedPlaceType === "전체" || item.type === selectedPlaceType) &&
    (selectedPlaceStatus === "전체" || item.status === selectedPlaceStatus)
  );

  const addPlace = () => {
    if (newPlaceName.trim() === "") {
      alert("장소 이름을 입력해주세요.");
      return;
    }

    if (newPlaceMapUrl.trim() === "") {
      alert("구글맵 링크를 입력해주세요.");
      return;
    }

    const newPlace = {
      id: editingPlaceId ?? Date.now(),
      type: newPlaceType,
      name: newPlaceName,
      status: newPlaceStatus,
      area: newPlaceArea,
      mapUrl: newPlaceMapUrl,
      memo: newPlaceMemo,
    };

    if (editingPlaceId !== null) {
      setPlaceList(
        placeList.map((item) =>
          item.id === editingPlaceId ? newPlace : item
        )
      );

      setEditingPlaceId(null);
    } else {
      setPlaceList([newPlace, ...placeList]);
    }

    setNewPlaceName("");
    setNewPlaceMapUrl("");
    setNewPlaceMemo("");
  };

  const deletePlace = (id: number, name: string) => {
    const confirmed = confirm(`"${name}" 장소를 삭제하시겠습니까?`);

    if (!confirmed) return;

    setPlaceList(placeList.filter((item) => item.id !== id));
  }; 

  const changePlaceStatus = (id: number) => {
    const statusOrder = ["후보", "확정", "예약완료", "방문완료"];

    setPlaceList(
      placeList.map((item) => {
        if (item.id !== id) return item;

        const currentIndex = statusOrder.indexOf(item.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;

        return {
          ...item,
          status: statusOrder[nextIndex],
        };
      })
    );
  };


  const addComment = () => {
    if (newCommentAuthor.trim() === "") {
      alert("작성자를 입력해주세요.");
      return;
    }

    if (newCommentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const newComment: CommentItem = {
      id: Date.now(),
      author: newCommentAuthor,
      content: newCommentContent,
      createdAt: new Date().toLocaleDateString("ko-KR"),
    };

    setCommentsList([newComment, ...commentsList]);
    setNewCommentContent("");
  };

  const deleteComment = (id: number) => {
    setCommentsList(commentsList.filter((item) => item.id !== id));
  };




  const startEditPlace = (item: {
    id: number;
    type: string;
    name: string;
    status: string;
    area: string;
    mapUrl: string;
    memo: string;
  }) => {
    setEditingPlaceId(item.id);
    setNewPlaceName(item.name);
    setNewPlaceType(item.type);
    setNewPlaceStatus(item.status);
    setNewPlaceArea(item.area);
    setNewPlaceMapUrl(item.mapUrl);
    setNewPlaceMemo(item.memo);
  };

  const cancelEditPlace = () => {
    setEditingPlaceId(null);

    setNewPlaceName("");
    setNewPlaceType("맛집");
    setNewPlaceStatus("후보");
    setNewPlaceArea("푸켓");
    setNewPlaceMapUrl("");
    setNewPlaceMemo("");
  };

  const addExpense = () => {
    if (newExpenseTitle.trim() === "") {
      alert("비용 항목을 입력해주세요.");
      return;
    }

    if (newExpenseAmount.trim() === "") {
      alert("금액을 입력해주세요.");
      return;
    }

    const amount = Number(newExpenseAmount);
    const exchangeRate = Number(newExpenseExchangeRate);

    if (Number.isNaN(amount) || amount <= 0) {
      alert("금액은 숫자로 입력해주세요.");
      return;
    }
    if (Number.isNaN(exchangeRate) || exchangeRate <= 0) {
      alert("환율은 숫자로 입력해주세요.");
      return;
    }

    const amountInKrw =
      newExpenseCurrency === "KRW" ? amount : amount * exchangeRate;
    const newExpense = {
      id: editingExpenseId ?? Date.now(),
      date: newExpenseDate,
      title: newExpenseTitle,
      category: newExpenseCategory,
      originalAmount: amount,
      currency: newExpenseCurrency,
      exchangeRate,
      amount: amountInKrw,
      paidBy: newExpensePaidBy,
      split: "두 가족 1/2",
      memo: newExpenseMemo,
    };

    if (editingExpenseId !== null) {
      setExpenseList(
        expenseList.map((item) =>
          item.id === editingExpenseId ? newExpense : item
        )
      );
      setEditingExpenseId(null);
    } else {
      setExpenseList([newExpense, ...expenseList]);
    }

    setNewExpenseTitle("");
    setNewExpenseAmount("");
    setNewExpenseMemo("");
  };

  const deleteExpense = (id: number, title: string) => {
    const confirmed = confirm(`"${title}" 비용을 삭제하시겠습니까?`);

    if (!confirmed) return;

    setExpenseList(expenseList.filter((item) => item.id !== id));
  };

  const startEditExpense = (item: {
    id: number;
    title: string;
    date: string;
    category?: string;
    originalAmount?: number;
    currency?: string;
    exchangeRate?: number;
    amount: number;
    paidBy: string;
    split: string;
    memo: string;
  }) => {
    setEditingExpenseId(item.id);
    setNewExpenseTitle(item.title);
    setNewExpenseDate(item.date);
    setNewExpenseCategory(item.category ?? "기타");
    setNewExpenseAmount(
      String(item.originalAmount ?? item.amount)
    );
    setNewExpensePaidBy(item.paidBy);
    setNewExpenseMemo(item.memo);
    setNewExpenseCurrency(item.currency ?? "KRW");
    setNewExpenseExchangeRate(String(item.exchangeRate ?? 1));
  };

  const cancelEditExpense = () => {
    setEditingExpenseId(null);
    setNewExpenseTitle("");
    setNewExpenseAmount("");
    setNewExpensePaidBy("수현이네");
    setNewExpenseMemo("");
  };

  const addBooking = () => {
    if (newBookingTitle.trim() === "") {
      alert("예약 제목을 입력해주세요.");
      return;
    }

    const newBooking = {
      id: editingBookingId ?? Date.now(),
      type: newBookingType,
      title: newBookingTitle,
      date: newBookingDate,
      family: newBookingFamily,
      status: newBookingStatus,
      detail: newBookingDetail,
    };

    if (editingBookingId !== null) {
      setBookingList(
        bookingList.map((item) =>
          item.id === editingBookingId ? newBooking : item
        )
      );
      setEditingBookingId(null);
    } else {
      setBookingList([newBooking, ...bookingList]);
    }

    setNewBookingTitle("");
    setNewBookingDate("");
    setNewBookingDetail("");
  };

  const deleteBooking = (id: number, title: string) => {
    const confirmed = confirm(`"${title}" 예약을 삭제하시겠습니까?`);

    if (!confirmed) return;

    setBookingList(bookingList.filter((item) => item.id !== id));
  };

  const changeBookingStatus = (id: number) => {
    const statusOrder = ["후보", "예약대기", "예약완료", "취소"];

    setBookingList(
      bookingList.map((item) => {
        if (item.id !== id) return item;

        const currentIndex = statusOrder.indexOf(item.status ?? "후보");
        const nextIndex = (currentIndex + 1) % statusOrder.length;

        return {
          ...item,
          status: statusOrder[nextIndex],
        };
      })
    );
  };

  const startEditBooking = (item: {
    id: number;
    type: string;
    title: string;
    date: string;
    family: string;
    status: string;
    detail: string;
  }) => {
    setEditingBookingId(item.id);
    setNewBookingType(item.type);
    setNewBookingTitle(item.title);
    setNewBookingDate(item.date);
    setNewBookingFamily(item.family);
    setNewBookingStatus(item.status);
    setNewBookingDetail(item.detail);
  };

  const cancelEditBooking = () => {
    setEditingBookingId(null);
    setNewBookingType("호텔");
    setNewBookingTitle("");
    setNewBookingDate("");
    setNewBookingFamily("전체");
    setNewBookingStatus("후보");
    setNewBookingDetail("");
  };

  return (
    <main className="min-h-screen touch-auto bg-slate-100 pb-32 text-slate-900">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-bold">🌴 FamilyTrip</h1>
        <p className="text-gray-500">푸켓 & 싱가포르 가족 여행</p>
      </header>





      <section className="p-4">
        <h2 className="mb-3 text-xl font-bold">{activeTab}</h2>

        {activeTab === "홈" && (
          <HomeTab
            today={today}
            suhyunDDay={suhyunDDay}
            eunheeDDay={eunheeDDay}
            meetDDay={meetDDay}
            preparationRate={preparationRate}
            requiredPreparationItems={requiredPreparationItems}
            completedPreparationItems={completedPreparationItems}
            getPreparationStatus={getPreparationStatus}
          />
        )}

        {activeTab === "일정" && (
          <ScheduleTab
            families={families}
            selectedFamily={selectedFamily}
            setSelectedFamily={setSelectedFamily}
            visibleSchedules={visibleSchedules}
          />
        )}

        {activeTab === "예약" && (
          <BookingTab
            bookingTypes={bookingTypes}
            selectedBookingType={selectedBookingType}
            setSelectedBookingType={setSelectedBookingType}
            visibleBookings={visibleBookings}
            newBookingType={newBookingType}
            setNewBookingType={setNewBookingType}
            newBookingTitle={newBookingTitle}
            setNewBookingTitle={setNewBookingTitle}
            newBookingDate={newBookingDate}
            setNewBookingDate={setNewBookingDate}
            newBookingFamily={newBookingFamily}
            setNewBookingFamily={setNewBookingFamily}
            newBookingStatus={newBookingStatus}
            setNewBookingStatus={setNewBookingStatus}
            newBookingDetail={newBookingDetail}
            setNewBookingDetail={setNewBookingDetail}
            editingBookingId={editingBookingId}
            addBooking={addBooking}
            cancelEditBooking={cancelEditBooking}
            startEditBooking={startEditBooking}
            changeBookingStatus={changeBookingStatus}
            deleteBooking={deleteBooking}
          />
        )}

        {activeTab === "비용" && (
          <ExpenseTab
            newExpenseTitle={newExpenseTitle}
            setNewExpenseTitle={setNewExpenseTitle}
            newExpenseAmount={newExpenseAmount}
            setNewExpenseAmount={setNewExpenseAmount}
            newExpenseCurrency={newExpenseCurrency}
            setNewExpenseCurrency={setNewExpenseCurrency}
            newExpenseExchangeRate={newExpenseExchangeRate}
            setNewExpenseExchangeRate={setNewExpenseExchangeRate}
            newExpensePaidBy={newExpensePaidBy}
            setNewExpensePaidBy={setNewExpensePaidBy}
            newExpenseMemo={newExpenseMemo}
            setNewExpenseMemo={setNewExpenseMemo}
            editingExpenseId={editingExpenseId}
            addExpense={addExpense}
            cancelEditExpense={cancelEditExpense}
            totalExpense={totalExpense}
            eachFamilyShare={eachFamilyShare}
            paidBySuhyun={paidBySuhyun}
            paidByEunhee={paidByEunhee}
            settlementMessage={settlementMessage}
            expenseSummaryByCategory={expenseSummaryByCategory}
            newExpenseDate={newExpenseDate}
            setNewExpenseDate={setNewExpenseDate}
            expenseList={expenseList}
            startEditExpense={startEditExpense}
            deleteExpense={deleteExpense}
            expenseCategories={expenseCategories}
            newExpenseCategory={newExpenseCategory}
            setNewExpenseCategory={setNewExpenseCategory}
          />
        )}

        {activeTab === "장소" && (
          <PlaceTab
            placeTypes={placeTypes}
            placeStatuses={placeStatuses}
            selectedPlaceType={selectedPlaceType}
            setSelectedPlaceType={setSelectedPlaceType}
            selectedPlaceStatus={selectedPlaceStatus}
            setSelectedPlaceStatus={setSelectedPlaceStatus}
            visiblePlaces={visiblePlaces}
            newPlaceName={newPlaceName}
            setNewPlaceName={setNewPlaceName}
            newPlaceType={newPlaceType}
            setNewPlaceType={setNewPlaceType}
            newPlaceStatus={newPlaceStatus}
            setNewPlaceStatus={setNewPlaceStatus}
            newPlaceArea={newPlaceArea}
            setNewPlaceArea={setNewPlaceArea}
            newPlaceMapUrl={newPlaceMapUrl}
            setNewPlaceMapUrl={setNewPlaceMapUrl}
            newPlaceMemo={newPlaceMemo}
            setNewPlaceMemo={setNewPlaceMemo}
            editingPlaceId={editingPlaceId}
            addPlace={addPlace}
            cancelEditPlace={cancelEditPlace}
            startEditPlace={startEditPlace}
            deletePlace={deletePlace}
            changePlaceStatus={changePlaceStatus}
          />
        )}

        {activeTab === "의견" && (
          <OpinionTab
            commentsList={commentsList}
            newCommentAuthor={newCommentAuthor}
            setNewCommentAuthor={setNewCommentAuthor}
            newCommentContent={newCommentContent}
            setNewCommentContent={setNewCommentContent}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        )}
      </section>

        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-lg">
          <div className="grid grid-cols-6 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-[52px] rounded-xl px-1 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
    </main>
  );
}