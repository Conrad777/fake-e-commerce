"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Info } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {/* <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        /> */}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/product/${product.id}`)}>
          <Info className="h-4 w-4 mr-2" />
          More Info
        </Button>
        <Button size="sm" className="flex-1" onClick={() => addToCart(product)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

