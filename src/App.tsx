import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksPage from "./features/Books/presentation/components/BooksPage";
import BookDetailsPage from "./features/Books/presentation/components/BookDetailsPage";
import ChapterPage from "./features/Books/presentation/components/ChapterPage";
import PageEditor from "./features/Books/presentation/components/PageEditor";
import BooksCreate from "./features/Books/presentation/components/BooksCreate";
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import BooksEdit from "./features/Books/presentation/components/BooksEdit";
export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer theme="colored" className="bg-amber-200" position="top-right"/>
      <Routes>
        <Route path="/books/create" element={<BooksCreate/>}/>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
         <Route
          path="/books/:bookId/index"
          element={<PageEditor isIndex />}
        />
        <Route
          path="/books/:bookId/chapters/:chapterId"
          element={<ChapterPage />}
        />
        <Route
          path="/books/:bookId/chapters/:chapterId/pages/:pageId"
          element={<PageEditor />}
        />
        <Route path="/books/:bookId/edit" element={<BooksEdit />} />
      </Routes>
    </BrowserRouter>
  );
}