import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout, Anchor, Menu } from 'antd'

import Cart from '../components/Cart'

const { Header, Content, Footer } = Layout

interface NavEvent {
  key: string;
}

const AppLayout:React.FC = ({ children }) => {
  const router = useRouter()
  const [ selectedKey, setSelectedKey ] = useState("")

  function handleNavigation(e:NavEvent) {
    const { key } = e
    
    setSelectedKey(key)
    router.push(`/${key}`)
  }

  return (
    <>
      <Head>
        <title>EShoes</title>
      </Head>

      <Layout id="layout">
        <Header>
          <h1 id="logo">EShoes</h1>
          <Cart />
          <Menu 
            mode="horizontal" 
            theme="dark" 
            id="navbar"
            onClick={handleNavigation}
            selectedKeys={[selectedKey]}
          >
            <Menu.Item key="products">Produtos</Menu.Item>
            <Menu.Item key="about">Sobre</Menu.Item>
          </Menu>
        </Header>
        <Content id="content">
          {children}
        </Content>
        <Footer>
          <Anchor className="author-link">
            <Anchor.Link
              title="Desenvolvido por Matheus Andrade"
              href="https://github.com/matheusAMDS"
              target="_blank"
            />
          </Anchor>
        </Footer>
      </Layout>
    </>
  )
}

export default AppLayout