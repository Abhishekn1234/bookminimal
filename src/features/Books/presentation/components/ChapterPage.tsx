import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { createPage } from "../../../api/apiConfig";
import { toast } from "react-toastify";

export default function ChapterPage() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<any>(null);
  const [title, setTitle] = useState("");

  const fetchChapter = async () => {
    const res = await api.get(`/books/${bookId}/chapters/${chapterId}`);
    setChapter(res.data);
  };

  useEffect(() => {
    fetchChapter();
  }, [bookId, chapterId]);

  const handleCreatePage = async () => {
    if (!title.trim()) {
      alert("Page title cannot be empty");
      return;
    }

    await createPage(bookId!, chapterId!, { title });
    toast.success("Page created")
    setTitle("");
    fetchChapter();
  };

  if (!chapter)
    return (
      <div className="p-8 text-center text-gray-500">Loading chapter...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
       
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-semibold mb-6 text-center">
          {chapter.title}
        </h1>

       
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-6">
          <input
            type="text"
            placeholder="Enter new page title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 mb-3 sm:mb-0 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleCreatePage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded shadow transition"
          >
            Add Page
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chapter.pages.length === 0 && (
            <div className="text-gray-500 italic col-span-full">
              No pages yet. Add one above!
            </div>
          )}

          {chapter.pages.map((page: any) => (
            <div
              key={page.id}
              onClick={() =>
                navigate(
                  `/books/${bookId}/chapters/${chapterId}/pages/${page.id}`
                )
              }
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-200 transition"
            >
              {page.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}