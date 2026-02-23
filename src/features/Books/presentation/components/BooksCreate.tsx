import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../api/apiConfig";
import { toast } from "react-toastify";

export default function BooksCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState(0);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Book title is required!");
      return;
    }
    await createBook({ title, description, initialPages: pages });
    toast.success("Book Created!")
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Create New Book
        </h1>

       
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        
        <div className="mb-4">
          <textarea
            placeholder="Enter book description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <input
            type="number"
            min={0}
            placeholder="Initial number of pages"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}