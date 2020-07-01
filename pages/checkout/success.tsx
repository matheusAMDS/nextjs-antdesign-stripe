import { Alert, Button } from 'antd'
import Link from 'next/link'

const CheckoutSuccess:React.FC = () => {
  return (
    <>
      <Alert message="Compras realizadas com sucesso" />
      <Link href="/products">
        <a>
          <Button type="primary" style={{ margin: 30 }}>
            Voltar às compras
          </Button>
        </a>
      </Link>
    </>
  )
}

export default CheckoutSuccess