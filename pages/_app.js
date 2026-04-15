import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import { useEffect, useState } from "react";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export default function App({ Component, pageProps }) {
  const [bookmarks, setBookmarks] = useState(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  function toggleBookmark(id) {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      </SWRConfig>
    </>
  );
}
