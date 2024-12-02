"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre?: string;
  isbn: string;
  price: string;
  stock: number;
  image?: string; // Base64 image
}

const BestSellingBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/bestSellingBooks");
        const data = await response.json();
  
        if (data.success) {
          setBooks(data.books || []);
        } else {
          setBooks([]);
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching best-selling books:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, []);
  

  if (loading) {
    return <p className="text-center text-lg">Loading best-selling books...</p>;
  }

  return (
    <section className="best-selling-books-section py-32">
      <h2 className="text-center text-4xl text-accent-black_olive font-bold mb-10 py-7">
        Best Selling Books
      </h2>
      <div className="space-y-16">
        {books.map((book) => (
          <div key={book.book_id} className="book-item flex flex-col lg:flex-row items-center">
            {/* Book Image */}
            <div className="w-full lg:w-1/3 flex justify-center mb-6 lg:mb-0">
              {book.image ? (
                <Image
                  src={`data:image/png;base64,${book.image}`}
                  alt={book.title}
                  width={250}
                  height={350}
                  className="shadow-lg rounded-lg"
                />
              ) : (
                <div className="w-64 h-96 bg-gray-200 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="w-full lg:w-2/3 lg:pl-8 lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-accent-black_olive">
                {book.title}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-1">by {book.author}</p>
              <p className="text-xl text-amber-500 font-semibold mb-4">${book.price}</p>
              {book.genre && (
                <p className="text-sm font-medium text-gray-600 mb-2">Genre: {book.genre}</p>
              )}
              <p className="text-md text-gray-500 mb-6">ISBN: {book.isbn}</p>
              <Button href="#" label="Quick Add" className="no-underline" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellingBooks;



// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Button from './Button'; // Import the Button component

// const books = [
//   {
//     id: 1,
//     src: "/books/SallyRooney.jpg",
//     title: "Intermezzo: A Novel",
//     author: "Sally Rooney",
//     description:
//       "We all caught the Sally Rooney bug with her stunning debut Conversations with Friends — now we’re ready to fall in love all over again. Intermezzo absolutely soars with complicated relationships (romantic and familial) and the signature writing we can’t get enough of from a literary icon.",
//     price: "$26.00",
//     link: "/buy/book_1",
//   },
//   {
//     id: 2,
//     src: "/books/BesselVan.jpg",
//     title: "The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma",
//     author: "Bessel van der Kolk M.D.",
//     description:
//       "Anyone who has ever dealt with any sort of trauma (or anyone merely curious of the subject) absolutely must read this. This scientific exploration redefines modern understanding, showing how the body and brain literally change from trauma, and what you can do to treat it.",
//     price: "$19.00",
//     link: "/buy/book_2",
//   },
//   // Add more books as needed
// ];

// const BestSellingBooks = () => {
//   const [offsetY, setOffsetY] = useState(0);

//   const handleScroll = () => {
//     setOffsetY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="
//                         best-selling-books-section 
//                         py-32
//                        "
//     >
//       <h2 className="
//                         text-center 
//                         text-4xl 
//                         text-accent-black_olive
//                         font-bold 
//                         mb-10
//                         py-7
//                     "
//       >Best Selling Books
//       </h2>
//       <div className="space-y-16">
//         {books.map((book, index) => (
//           <div
//             key={book.id}
//             className="
//                         book-item 
//                         flex 
//                         flex-col 
//                         lg:flex-row 
//                         items-center
//                       "
//             style={{
//               transform: `translateY(${offsetY * (0.05 + index * 0.02)}px)`,
//             }}
//           >
//             {/* Book Image */}
//             <div className="
//                             w-full 
//                             lg:w-1/3 
//                             flex 
//                             justify-center 
//                             mb-6 
//                             lg:mb-0
//                            "
//             >
//               <Image
//                 src={book.src}
//                 alt={book.title}
//                 width={250}
//                 height={350}
//                 className="
//                             shadow-lg 
//                             rounded-lg
//                           "
//               />
//             </div>

//             {/* Book Details */}
//             <div className="
//                             w-full 
//                             lg:w-2/3 
//                             lg:pl-8 
//                             lg:text-left
//                             "
//             >
//               <h3 className="
//                             text-2xl 
//                             font-semibold 
//                             mb-2 
//                             text-accent-black_olive
//                             "
//               >{book.title}
//               </h3>
//               <p className="
//                             text-lg 
//                             font-medium 
//                             text-gray-700 
//                             mb-1
//                            "
//               >by {book.author}
//               </p>
//               <p className="
//                             text-xl 
//                             text-amber-500 
//                             font-semibold 
//                             mb-4
//                            "
//               >{book.price}
//               </p>
//               <p className="
//                             text-lg 
//                             mb-6
//                            "
//               >{book.description}
//               </p>

//               {/* Use Button component */}
//               <Button href={book.link} label="Quick Add" className="no-underline" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BestSellingBooks;




