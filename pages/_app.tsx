import { AppProps } from 'next/app'

import Layout from '../components/Layout'

import { CartProvider } from '../context/CartContext'
import '../styles/index.css'

const MyApp:React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default MyApp