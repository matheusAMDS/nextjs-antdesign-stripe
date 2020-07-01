import { useState, useContext } from 'react'
import { Modal, Button } from 'antd'
import { ShoppingCartOutlined, CloseCircleOutlined } from '@ant-design/icons'

import Checkout from '../components/Checkout'

import { CartContext } from '../context/CartContext'

export default function Cart() {
  const { cart, total, removeFromCart } = useContext(CartContext)
  const [ visible, setVisible ] = useState(false)

  return (
    <>
      <ShoppingCartOutlined 
        onClick={() => setVisible(true)}
        id="cart-button"
      />
      <Modal
        title="Produtos selecionados"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancelar
          </Button>,
          <Checkout key="submit" label="Checkout" />
        ]}
      >
        {cart.map((product, index) => (
          <div 
            key={index} 
            className="cart-product-info"
          >
            <span>{product.name}:&nbsp;</span>
            <span>
              R${product.price}&nbsp;
              <CloseCircleOutlined onClick={() => removeFromCart(product)}/>
            </span>
          </div>
        ))}
        <div
          className="cart-product-info"
        >
          <strong>Total: </strong>
          <strong>R${total()}</strong>
        </div>
      </Modal>
    </>
  )
}