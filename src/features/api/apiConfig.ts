import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});



export const getBooks = () => api.get("/books");

export const getBook = (bookId: string) =>
  api.get(`/books/${bookId}`);

export const createBook = (data: {
  title: string;
  description: string;
  initialPages: number;
}) => api.post("/books", data);

export const updateBook = async (
  bookId: string,
  data: { title?: string; description?: string }
) => {
  const res = await api.put(`/books/${bookId}`, data);
  return res.data;
};

export const createChapter = (bookId: string, data: any) =>
  api.post(`/books/${bookId}/chapters`, data);



export const createPage = (
  bookId: string,
  chapterId: string,
  data: any
) =>
  api.post(
    `/books/${bookId}/chapters/${chapterId}/pages`,
    data
  );

export const savePage = (
  bookId: string,
  chapterId: string,
  pageId: string,
  data: any
) =>
  api.post(
    `/books/${bookId}/chapters/${chapterId}/pages/${pageId}/save`,
    data
  );

export const restoreVersion = (
  bookId: string,
  chapterId: string,
  pageId: string,
  version: number
) =>
  api.post(
    `/books/${bookId}/chapters/${chapterId}/pages/${pageId}/restore/${version}`
  );

export const getPageVersions = (
  bookId: string,
  chapterId: string,
  pageId: string
) =>
  api.get(
    `/books/${bookId}/chapters/${chapterId}/pages/${pageId}/versions`
  );



export const getIndexVersions = (bookId: string) =>
  api.get(`/books/${bookId}/index/versions`);

export const saveIndex = (bookId: string, data: any) =>
  api.post(`/books/${bookId}/index/save`, data);

export const restoreIndexVersion = (
  bookId: string,
  version: number
) =>
  api.post(`/books/${bookId}/index/restore/${version}`);

export default api;