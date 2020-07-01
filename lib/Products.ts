import fs from 'fs'
import path from 'path'

export interface Product {
  imgUrl: string;
  name: string;
  price: number;
  productId: string;
  priceId: string;
}

export default {
  async list() {
    const filePath = path.resolve(process.cwd(), 'data', 'products.json')
    const rawProducts = fs.readFileSync(filePath, 'utf8') 
    const products:Product[] = JSON.parse(rawProducts)

    return products
  },

  async show(name:string) {
    const products:Product[] = await this.list()
    const product = products.find(product => product.name === name)

    return product
  },

  async listPaths() {
    const products:Product[] = await this.list()
    const paths = products.map(product => ({ 
      params: { 
        name: product.name 
      }
    }))

    return paths
  }
}

