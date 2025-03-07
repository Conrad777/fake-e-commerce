"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import LoginModal from "./login-modal"

// commit to push change

export default function Header() {
  const router = useRouter()
  const { cart, cartCount } = useCart()
  const { user, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            T-Shirt Store
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm hidden md:inline-block">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsLoginModalOpen(true)}>
                <User className="h-5 w-5 mr-2" />
                <span className="hidden md:inline-block">Login</span>
              </Button>
            )}

            <Button variant="outline" size="icon" onClick={() => router.push("/checkout")} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}

