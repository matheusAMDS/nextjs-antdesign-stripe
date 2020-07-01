import { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button, message } from 'antd'

import { CartContext } from '../context/CartContext'
import stripeConfig from '../config/stripe'

const stripePromise = loadStripe(stripeConfig.public_key)

interface Props {
  id?: string;
  key?: string;
  label: string;
  productPriceId?: string;
}

const Checkout:React.FC<Props> = ({ label, productPriceId, id, key }) => {
  const { cart } = useContext(CartContext)

  const handleClick = async (event) => {
    const stripe = await stripePromise
    const items = productPriceId ? 
      [
        {
          price: productPriceId,
          quantity: 1,
        }
      ] : cart.map(product => ({
        price: product.priceId,
        quantity: 1
      }))

    const { error } = await stripe.redirectToCheckout({
      lineItems: items,
      mode: 'payment',
      successUrl: 'http://localhost:3000/checkout/success',
      cancelUrl: 'http://localhost:3000/products'
    })

    if (error)
      message.error(error.message)
  }

  return (
    <Button
      id={id}
      key={key} 
      role="link" 
      type="primary" 
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}

export default Checkout