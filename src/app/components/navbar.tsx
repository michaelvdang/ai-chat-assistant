'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  // console.log("navbar.tsx: ", pathname)

  return (
    <nav className="fixed z-20 top-0 left-0 right-0 bg-white max-w-7xl mx-auto border-b border-gray-200 px-4 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/" className="text-blue-500">MyLogo
        </Link>
      </div>
      <div className="space-x-4">
        <Link href="/" className={`text-lg ${isActive('/') ? 'text-blue-500' : 'text-gray-700'}`}>Home
        </Link>
        <Link href="/chat1" className={`text-lg ${isActive('/chat1') ? 'text-blue-500' : 'text-gray-700'}`}>Chat1
        </Link>
        <Link href="/about" className={`text-lg ${isActive('/about') ? 'text-blue-500' : 'text-gray-700'}`}>About
        </Link>
        <Link href="/services" className={`text-lg ${isActive('/services') ? 'text-blue-500' : 'text-gray-700'}`}>Services
        </Link>
        <Link href="/contact" className={`text-lg ${isActive('/contact') ? 'text-blue-500' : 'text-gray-700'}`}>Contact
        </Link>
        <Link href="/register" className="btn btn-primary">Register
        </Link>
        <Link href="/signin" className="btn btn-secondary">Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Navbar