'use client';

import React, { useEffect, useState, useRef } from 'react';
import BestSellingBooks from "./components/BestSellingBooks";
import HeroSlides from "./components/HeroSlides";
import BookSlider from "./components/BookSlider";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
  book_id: number;
  title: string;
  author: string;
  price: number;
  image: string | null; // Base64-encoded string or null
}

type BooksByGenre = { [key: string]: Book[] };

export default function Home() {
  const [genres, setGenres] = useState<string[]>([]);
  const [booksByGenre, setBooksByGenre] = useState<BooksByGenre>({});
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const genreRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // Store refs for each genre section

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        const data = await response.json();

        if (data.success) {
          const sortedGenres = data.genres.sort((a: string, b: string) =>
            a.trim().localeCompare(b.trim())
          );
          setGenres(sortedGenres);
        } else {
          console.error('Failed to fetch genres:', data.message);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  // Fetch books by genre
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const genreBookMap: BooksByGenre = {};
        for (const genre of genres) {
          const response = await fetch(`/api/books?genre=${encodeURIComponent(genre)}`);
          const data = await response.json();

          if (data.success) {
            genreBookMap[genre] = data.books;
          } else {
            console.error(`Failed to fetch books for genre "${genre}":`, data.message);
          }
        }
        setBooksByGenre(genreBookMap);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoadingBooks(false);
      }
    };

    if (genres.length > 0) {
      fetchBooks();
    }
  }, [genres]);

  // Scroll to the selected genre section
  const scrollToGenre = (genre: string) => {
    if (genreRefs.current[genre]) {
      genreRefs.current[genre]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main>
      <header>
        <HeroSlides />
      </header>

      <section className="mb-24">
        <BestSellingBooks />
      </section>

      {/* Section with Two Columns */}
      <section
        className="
          grid 
          grid-cols-4 
          gap-4 
          p-4 
          bg-user-page
          text-accent-black_olive
        "
      >
        {/* Left Sidebar with Sticky Position */}
        <div className="col-span-1 p-7 rounded-lg sticky top-4 h-[calc(100vh-2rem)] overflow-auto">
          <h2 className="text-lg font-bold mb-2">Categories</h2>
          {loadingGenres ? (
            <p>Loading categories...</p>
          ) : genres.length > 0 ? (
            genres.map((genre, index) => (
              <div
                key={index}
                className="
                  category
                  cursor-pointer
                  hover:bg-blue-100
                  hover:shadow-md
                  hover:scale-105
                  transition
                  duration-300
                  ease-in-out
                  p-2
                  rounded-lg
                "
                onClick={() => scrollToGenre(genre)} // Trigger scroll on click
              >
                {genre.trim()}
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>

        {/* Right Content with Book Sliders */}
        <div className="col-span-3 p-7 rounded-lg overflow-auto h-[calc(100vh-2rem)]">
          <h2 className="text-lg font-bold mb-2">Books</h2>
          {loadingBooks || loadingGenres ? (
            <p>Loading books...</p>
          ) : genres.length > 0 ? (
            genres.map((genre, index) => (
              <div
                key={index}
                className="mb-12"
                ref={(el) => {
                  genreRefs.current[genre] = el; // Assign each genre's ref
                }}
              >
                <h3 className="text-xl font-semibold mb-4">{genre.trim()} Books</h3>
                <BookSlider books={booksByGenre[genre] || []} />
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </section>
    </main>
  );
}


