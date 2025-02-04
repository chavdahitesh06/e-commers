import { ProductDetailsPage } from "@/components/product-details-page"

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailsPage productId={params.id} />
}

