import './globals.css';
import Navbar from './components/NarbarCustomer';
import { CartProvider } from './components/CartContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}


