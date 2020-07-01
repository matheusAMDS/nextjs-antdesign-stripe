import { useContext } from 'react'
import { Button } from 'antd'

import { Product } from '../lib/Products'
import { CartContext } from '../context/CartContext'

interface Props {
  product: Product;
}

const AddToCart:React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)

  return (
    <>
      { cart.map(product => product.name).includes(product.name)
        ? <Button 
            className="add-to-cart-button"
            onClick={() => removeFromCart({
              name: product.name,
              price: product.price,
              priceId: product.priceId
            })}
          >
            Remover do carrinho
          </Button>
        : <Button 
            type="primary" 
            className="add-to-cart-button"
            onClick={() => addToCart({
              name: product.name,
              price: product.price,
              priceId: product.priceId
            })}
          >
            Adicionar ao carrinho
          </Button>
      }
    </>
  )
}

export default AddToCart