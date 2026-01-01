// // app/layout.tsx
// import './globals.css'
// import { Inter } from 'next/font/google'
// import { CartProvider } from './lib/cart-context'
// import Header from './components/Header'
// import Footer from './components/Footer'

// import { AuthProvider } from './lib/auth-context'
// import { OrderProvider } from './lib/order-context'
// import { WishlistProvider } from './lib/wishlist-context'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'RS-Legacy - Modern E-Commerce Platform',
//   description: 'Discover amazing products at unbeatable prices. Quality guaranteed with fast shipping and excellent customer service.',
//   keywords: 'e-commerce, shopping, products, electronics, clothing, sports',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}
//       suppressHydrationWarning={true}
//       >
//         <div className="min-h-screen bg-gray-50">
//           <AuthProvider>
//           <CartProvider>
//             <Header/>
//             <OrderProvider>
//              <WishlistProvider>
//           {children}
//               </WishlistProvider>
//             </OrderProvider>
//           <Footer/>
//           </CartProvider>
//           </AuthProvider>
//         </div>
//       </body>
//     </html>
//   )
// }


// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from './lib/cart-context'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './lib/auth-context'
import { OrderProvider } from './lib/order-context'
import { WishlistProvider } from './lib/wishlist-context'
import { EmailJsProvider } from './providers/EmailJsProvider' // Add this import

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RS-Legacy - Modern E-Commerce Platform',
  description: 'Discover amazing products at unbeatable prices. Quality guaranteed with fast shipping and excellent customer service.',
  keywords: 'e-commerce, shopping, products, electronics, clothing, sports',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="min-h-screen bg-gray-50">
          <AuthProvider>
            <EmailJsProvider> {/* Add EmailJsProvider here */}
              <CartProvider>
                <Header/>
                <OrderProvider>
                  <WishlistProvider>
                    {children}
                  </WishlistProvider>
                </OrderProvider>
                <Footer/>
              </CartProvider>
            </EmailJsProvider> {/* Close EmailJsProvider */}
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}