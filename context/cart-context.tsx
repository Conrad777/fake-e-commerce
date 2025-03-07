"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product, CartItem } from "@/types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, size?: string) => void
  removeFromCart: (productId: string, size?: string) => void
  clearCart: () => void
  cartCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    // Calculate cart count and total price
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)

    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    setTotalPrice(price)
  }, [cart])

  const addToCart = (product: Product, size = "M") => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id && item.size === size)

      if (existingItemIndex >= 0) {
        // If the product is already in the cart, increase the quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // If the product is not in the cart, add it
        return [...prevCart, { ...product, quantity: 1, size }]
      }
    })
  }

  const removeFromCart = (productId: string, size = "M") => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === productId && item.size === size)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

