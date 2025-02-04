import { ProductListingPage } from "@/components/product-listing-page"

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <ProductListingPage category={params.category} />
}

