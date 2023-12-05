import StoreProvider from './StoreProvider';
import './globals.css'
import { Outfit } from 'next/font/google';


const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'Invomatic',
  description: 'Invomatic is a powerful and intuitive inventory management application designed to streamline your business operations. With Invomatic, you can effortlessly manage your stock, track inventory levels, and optimize your supply chain for increased efficiency and profitability.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
      <body className={`${outfit.className}`}>
        {children}
      </body>
      </StoreProvider>
    </html>
  )
}
