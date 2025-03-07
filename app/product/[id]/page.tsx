"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedImage(foundProduct.images[0])
    }
  }, [params.id])

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image src={selectedImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative h-20 w-20 cursor-pointer rounded-md border ${selectedImage === image ? "border-primary border-2" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          <Button size="lg" onClick={() => addToCart(product)} className="w-full md:w-auto">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

