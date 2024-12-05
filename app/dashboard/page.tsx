'use client';

import React, { useState } from 'react';
import AddBookForm from './components/AddBookForm'; // Adjust the path if needed
import RemoveBookForm from './components/RemoveBookForm'; // Adjust the path if needed
import ViewBook from './components/ViewBook';


const Page = () => {
  const [selectedPage, setSelectedPage] = useState< 'home' | 'add' | 'remove' | 'view' | 'orders' | 'manage' | null>(null);

  const renderRightPanelContent = () => {

    switch (selectedPage) {

      case 'home':
        return (
          <div>
            {/* <h1 className="text-accent-moonstone">Soren</h1> */}
            <img src="/logo/soren_lgt.png" alt="Logo" className="h-48 w-48 object-contain" />
          </div>
        );
       

      case 'add':
        return <AddBookForm />;
        
      case 'remove':
        return <RemoveBookForm />;

      case 'view':
        return <ViewBook />;

      case 'orders':
      return (
        <div>
          <h2>Customer Orders</h2>
          <p>This is the Customer order page content.</p>
        </div>
      );

      // case 'manage':
      // return <ManageBooks />

      // default:
      //   return (
      //     <div>
      //       {/* <h1 className="text-accent-moonstone">Soren</h1> */}
      //       <img src="/logo/soren_lgt.png" alt="Logo" className="h-48 w-48 object-contain" />
      //     </div>
      //   );
    }
  };

  return (
    <div className="page-container flex h-screen">

{/* Left Panel */}
      <div className="left-panel w-1/4 p-6 border-r border-accent-moonstone flex flex-col items-start space-y-5">
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('home')}
        >
          <div>
            
            <img src="/logo/soren_lgt.png" alt="Logo" className="h-24 w-24 object-contain" />
          </div>
        </button>
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('add')}
        >
          Add Book
        </button>
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('remove')}
        >
          Remove Book
        </button>
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('view')}
        >
          View Books
        </button>
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('orders')}
        >
          Customer Orders 
        </button>
        <button
          className="text-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:border hover:border-accent-moonstone transition"
          onClick={() => setSelectedPage('manage')}
        >
          Manage Books
        </button>
      </div>

{/* Right Panel */}
      <div className="right-panel w-3/4 bg-pro p-6 flex justify-center items-center">
        {renderRightPanelContent()}
      </div>
    </div>
  );
};

export default Page;






