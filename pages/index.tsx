import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'

const HomePage:React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/products')
  }, [])

  return <></>
}

export default HomePage