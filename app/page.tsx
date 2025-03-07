import ProductListing from "@/components/product-listing"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured T-Shirts</h1>
      <ProductListing />
    </main>
  )
}

