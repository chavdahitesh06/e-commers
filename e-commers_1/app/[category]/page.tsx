import { ProductListingPage } from "@/components/product-listing-page"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category
  return <ProductListingPage category={category} />
}

