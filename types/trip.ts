export type ScheduleItem = {
  day: string;
  title: string;
  family: string;
  memo: string;
};

export type BookingItem = {
  id: number;
  type: string;
  title: string;
  date: string;
  family: string;
  status: string;
  detail: string;
};

export type ExpenseItem = {
  id: number;
  date: string;
  title: string;
  category: string;
  originalAmount?: number;
  currency?: string;
  exchangeRate?: number;
  amount: number;
  paidBy: string;
  split: string;
  memo: string;
};

export type PlaceItem = {
  id: number;
  type: string;
  name: string;
  status: string;
  area: string;
  mapUrl: string;
  memo: string;
};

export type CommentItem = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
};