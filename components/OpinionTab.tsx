import type { CommentItem } from "@/types/trip";

type OpinionTabProps = {
  commentsList: CommentItem[];
  newCommentAuthor: string;
  setNewCommentAuthor: (value: string) => void;
  newCommentContent: string;
  setNewCommentContent: (value: string) => void;
  addComment: () => void;
  deleteComment: (id: number) => void;
};

export default function OpinionTab({
  commentsList,
  newCommentAuthor,
  setNewCommentAuthor,
  newCommentContent,
  setNewCommentContent,
  addComment,
  deleteComment,
}: OpinionTabProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <h3 className="mb-3 text-lg font-bold text-slate-900">댓글 추가</h3>

        <input
          value={newCommentAuthor}
          onChange={(e) => setNewCommentAuthor(e.target.value)}
          placeholder="작성자 예: 민수"
          className="mb-2 w-full rounded-lg border p-2"
        />

        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="의견을 입력하세요"
          className="mb-3 w-full rounded-lg border p-2"
        />

        <button
          onClick={addComment}
          className="w-full rounded-lg bg-slate-800 px-4 py-2 text-white"
        >
          댓글 저장
        </button>
      </div>

      {commentsList.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-300 bg-white p-4 shadow-md"
        >
          <div className="mb-1 text-sm font-medium text-slate-500">
            {item.author} · {item.createdAt}
          </div>

          <p className="font-medium text-slate-800">{item.content}</p>

          <button
            onClick={() => deleteComment(item.id)}
            className="mt-3 rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}