export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
}

export interface CartItem extends Product {
  quantity: number
  size?: string
}

