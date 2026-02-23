import { useEffect, useState } from "react";
import { getBooks } from "../../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../domain/entities/book";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data || []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / perPage);
  const paginatedBooks = books.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
  
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-center sm:text-left">Books</h1>
          <button
            onClick={() => navigate("/books/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition"
          >
            Add Book
          </button>
        </div>


        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBooks.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500 italic">
                    No books available. Add a new book!
                  </td>
                </tr>
              )}
              {paginatedBooks.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.description || "-"}</td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/books/${book.id}`)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded shadow transition text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/books/${book.id}/edit`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow transition text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-400"
            } transition`}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-400"
              } transition`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-400"
            } transition`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}