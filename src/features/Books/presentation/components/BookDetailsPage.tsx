import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { createChapter } from "../../../api/apiConfig";
import { PlusIcon, BookOpenIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [title, setTitle] = useState("");

  const fetchBook = async () => {
    const res = await api.get(`/books/${bookId}`);
    setBook(res.data);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleCreateChapter = async () => {
    if (!title.trim()) return; // prevent empty titles
    await createChapter(bookId!, {
      title,
      order: book.chapters.length + 1,
    });
    setTitle("");
    fetchBook();
  };

  if (!book) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
     
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <button
            onClick={() => navigate(`/books/${bookId}/index`)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            <BookOpenIcon className="w-5 h-5" />
            Open Index
          </button>
        </div>
        <p className="mt-2 text-gray-600">{book.description || "No description available."}</p>
      </div>

      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5 text-green-500" />
          Add New Chapter
        </h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <PencilIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              placeholder="Chapter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleCreateChapter}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {book.chapters.map((chapter: any) => (
          <div
            key={chapter.id}
            onClick={() => navigate(`/books/${bookId}/chapters/${chapter.id}`)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition flex items-center gap-3"
          >
            <PencilIcon className="w-6 h-6 text-purple-500" />
            <div>
              <p className="font-semibold text-gray-900">{chapter.title}</p>
              <p className="text-sm text-gray-500">Chapter {chapter.order}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}