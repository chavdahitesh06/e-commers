import { ProductListingPage } from "@/components/product-listing-page"

export default function CategoryPage({ params }: { params: { slug: string[] } }) {
  const [category, subcategory] = params.slug
  return <ProductListingPage category={category} subcategory={subcategory} />
}

