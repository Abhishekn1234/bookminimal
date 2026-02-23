import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooks, updateBook } from "../../../api/apiConfig";
import type { Book } from "../../domain/entities/book";
import { toast } from "react-toastify";

export default function BooksEdit() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchBook = async () => {
    if (!bookId) return;
    const res = await getBooks();
    const b = res.data.find((b: Book) => b.id === bookId);
    if (!b) return;
    setBook(b);
    setTitle(b.title);
    setDescription(b.description || "");
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const handleUpdate = async () => {
    if (!bookId) return;
    await updateBook(bookId, { title, description });
    toast.success("Book Updated")
    navigate("/"); 
  };

  if (!book) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Edit Book
        </h1>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Description Input */}
        <div className="mb-8">
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Book Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
          >
            Back
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}