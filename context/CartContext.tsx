import { createContext, useState } from 'react'

interface ProductData {
  name: string;
  price: number;
  priceId: string;
}

interface CartType {
  cart: ProductData[];
  addToCart: (product:ProductData) => void;
  removeFromCart: (product:ProductData) => void;
  total: () => number;
}

export const CartContext = createContext<CartType|undefined>(undefined)

export const CartProvider:React.FC = ({ children }) => {
  const [ cart, setCart ] = useState<ProductData[]>([])

  function addToCart(product:ProductData) {
    const productInCart = cart.find(prod => prod.name === product.name)

    if (!productInCart)
      setCart(cart.concat(product))
  }

  function removeFromCart(product:ProductData) {
    setCart(cart.filter(prod => prod.name !== product.name))
  }

  function total() {
    if (cart.length > 0)
      return cart 
        .map(product => product.price)
        .reduce((prev, actual) => prev + actual)
    return 0
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, total, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}