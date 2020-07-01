import { Alert, Button } from 'antd'
import Link from 'next/link'

const CheckoutSuccess:React.FC = () => {
  return (
    <div id="checkout-success">
      <Alert message="Compras realizadas com sucesso" />
      <Link href="/products">
        <a>
          <Button type="primary">
            Voltar às compras
          </Button>
        </a>
      </Link>
    </div>
  )
}

export default CheckoutSuccess