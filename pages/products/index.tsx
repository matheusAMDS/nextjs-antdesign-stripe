import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Card, Row, Col } from 'antd'

import AddToCard from '../../components/AddToCart'

import Products, { Product } from '../../lib/Products'

interface Props {
  products: Product[];
}

export const getStaticProps:GetStaticProps = async () => {
  const products = await Products.list()

  return {
    props: {
      products
    }
  }
}

const Home:React.FC<Props> = ({ products }) => {
  const router = useRouter()

  function handleNavigation(name:string) {
    router.push('/products/[name]', `/products/${name}`)
  }

  return (
    <> 
      <h2>Produtos disponíveis</h2>
      <Row>
        {products.map((product, index) => (
          <Col key={index}>
            <Card 
              hoverable
              className="product-card"
              cover={(
                <img 
                  src={product.imgUrl} 
                  className="product-image"
                  onClick={() => handleNavigation(product.productPath)}
                />
              )}
            >
              <Card.Meta 
                title={product.name} 
                description={`US$ ${product.price}`}
              />
              <AddToCard product={product} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home