import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import Checkout from '../../components/Checkout'
import AddToCart from '../../components/AddToCart'

import Products, { Product } from '../../lib/Products'

interface Props {
  product: Product
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const product = await Products.show(params.name as string)

  return {
    props: {
      product
    }
  }
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await Products.listPaths()

  return {
    paths,
    fallback: false
  }
}

const ProductDetail:React.FC<Props> = ({ product }) => {
  return (
    <>
      <Link href="/products">
        <ArrowLeftOutlined className="goback-button" />
      </Link>
      <div className="product-detail">
        <img src={product.imgUrl} alt={product.name} />
        <Card className="product-detail-meta" title={product.name}>
          <Card.Meta description={`Price: UR$ ${product.price}`} />
          <AddToCart product={product} />
          <Checkout 
            id="buy-button" 
            label="Comprar agora" 
            productPriceId={product.priceId} 
          />
        </Card>
      </div>
    </>
  )
}

export default ProductDetail