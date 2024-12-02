'use client';

import BestSellingBooks from "./components/BestSellingBooks";
import HeroSlides from "./components/HeroSlides";
import BookSlider from "./components/BookSlider"; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main>
      <header>
        <HeroSlides />
      </header>
      
      <section className="mb-24">
        <BestSellingBooks />
      </section>

      {/* Section with Two Columns */}
      <section className="
                          grid 
                          grid-cols-4 
                          gap-4 
                          p-4 
                          bg-user-page
                          text-accent-black_olive
                          "
      >
        <div className="
                        col-span-1 
                        p-7 
                        rounded-lg
                       "
        >
          <h2 className="
                        text-lg 
                        font-bold 
                        mb-2
                        "
          >Category</h2>
          <p className="category">Fiction</p> 
          <p className="category">Non-fiction</p>
        </div>
        
        <div className="
                        col-span-3 
                        p-7 
                        rounded-lg
                       "
        >
          <h2 className="
                        text-lg 
                        font-bold 
                        mb-2
                        "
          >Books</h2>
          <BookSlider /> 
        </div>
      </section>
    </main>
  );
}


