"use client";

import React, { useState } from "react";

type SearchOption = "title" | "author" | "isbn" | "genre" | "all";
type LayoutOption = "layout1"; // Extend as needed

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn: string;
  price: string;
  stock: number;
  image?: string; // Base64 image or placeholder
}

const ManageBooks = () => {
  const [searchOption, setSearchOption] = useState<SearchOption>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedLayout, setSelectedLayout] = useState<LayoutOption>("layout1");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/findBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ criteria: searchOption, value: searchValue, multiple: true }),
      });
      const data = await response.json();
      if (data.success) {
        setBooks(data.books || []);
      } else {
        setBooks([]);
        alert(data.message || "No results found."); // Alert for no results
      }
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLayoutChange = async () => {
    try {
      await fetch("/api/updateSectionLayout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: selectedLayout }),
      });
      alert("Layout updated successfully!");
    } catch (error) {
      console.error("Error updating layout:", error);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Manage Books</h3>

      {/* Search Options */}
      <div className="flex gap-4 mb-4">
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value as SearchOption)}
          className="p-2 border rounded"
        >
          <option value="all">All Books</option>
          <option value="title">By Title</option>
          <option value="author">By Author</option>
          <option value="isbn">By ISBN</option>
          <option value="genre">By Genre</option>
        </select>
        {searchOption !== "all" && (
          <input
            type="text"
            placeholder={`Enter ${searchOption}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-2 border rounded"
          />
        )}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-accent-moonstone text-white rounded hover:bg-accent-minBlue"
        >
          Search
        </button>
      </div>

      {/* Layout Selection */}
      <div className="mb-4">
        <label className="block mb-2">Select Layout:</label>
        <select
          value={selectedLayout}
          onChange={(e) => setSelectedLayout(e.target.value as LayoutOption)}
          className="p-2 border rounded"
        >
          <option value="layout1">Layout 1</option>
          {/* Add more layouts as needed */}
        </select>
        <button
          onClick={handleLayoutChange}
          className="mt-4 px-4 py-2 bg-accent-moonstone text-white rounded hover:bg-accent-minBlue"
        >
          Update Layout
        </button>
      </div>

      {/* Search Results */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        books.length > 0 && (
          <div>
            <h4 className="font-bold mb-4">Search Results:</h4>
            <ul>
              {books.map((book) => (
                <li key={book.book_id} className="mb-4">
                  <p>
                    <strong>{book.title}</strong> by {book.author}
                  </p>
                  <p>Genre: {book.genre || "N/A"}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>Price: ${book.price}</p>
                  <p>Stock: {book.stock}</p>
                  <button
                    onClick={() => alert(`Added ${book.title} to the section`)}
                    className="px-4 py-2 bg-accent-moonstone text-white rounded hover:bg-accent-minBlue mt-2"
                  >
                    Add to Section
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {books.length === 0 && !loading && <p>No books found.</p>}
    </div>
  );
};

export default ManageBooks;


