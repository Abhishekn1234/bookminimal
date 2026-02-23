import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  savePage,
  restoreVersion,
  getPageVersions,
  getIndexVersions,
  saveIndex,
  restoreIndexVersion,
} from "../../../api/apiConfig";
import { toast } from "react-toastify";

interface Props {
  isIndex?: boolean;
}

export default function PageEditor({ isIndex }: Props) {
  const { bookId, chapterId, pageId } = useParams();

  const [content, setContent] = useState("");
  const [editor, setEditor] = useState("");
  const [versions, setVersions] = useState<any[]>([]);

  const fetchVersions = async () => {
    if (!bookId) return;

    if (isIndex) {
      const res = await getIndexVersions(bookId);
      setVersions(res.data.versions); 
    } else {
      if (!chapterId || !pageId) return;
      const res = await getPageVersions(bookId, chapterId, pageId);
      setVersions(res.data.versions);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, [bookId, chapterId, pageId]);

  const handleSave = async () => {
    if (!editor) {
      alert("Editor name required");
      return;
    }

    if (isIndex) {
      await saveIndex(bookId!, {
        content,
        editorName: editor,
      });
      toast.success("Index saved");
    } else {
      await savePage(bookId!, chapterId!, pageId!, {
        content,
        editorName: editor,
      });
      toast.success("page saved");
    }

    fetchVersions();
  };

  const handleRestore = async (version: number) => {
    if (isIndex) {
      await restoreIndexVersion(bookId!, version);
      toast.success("index restored");
    } else {
      await restoreVersion(bookId!, chapterId!, pageId!, version);
      toast.success("version restored");
    }

    fetchVersions();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {isIndex ? "Index Page Editor" : "Page Editor"}
        </h1>

       
        <input
          placeholder="Enter your name..."
          value={editor}
          onChange={(e) => setEditor(e.target.value)}
          className="w-full md:w-1/2 mb-4 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        
        <textarea
          rows={12}
          placeholder={
            isIndex
              ? "Write the content for the index page here..."
              : "Write your page content here..."
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 mb-6 border border-gray-300 rounded shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

 
        <button
          onClick={handleSave}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow transition mb-8"
        >
          Save & Create New Version
        </button>

        
        <h2 className="text-2xl font-semibold mb-4">Version History</h2>

        <div className="flex flex-col space-y-3">
          {versions.length === 0 && (
            <div className="text-gray-500 italic">No versions yet.</div>
          )}

          {versions.map((v) => (
            <div
              key={v}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="text-gray-800 font-medium">Version {v}</div>
              <button
                onClick={() => handleRestore(v)}
                className="mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}