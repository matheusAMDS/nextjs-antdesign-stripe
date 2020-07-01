import fs from 'fs'
import path from 'path'

export interface Product {
  imgUrl: string;
  name: string;
  price: number;
  productId: string;
  priceId: string;
  productPath: string;
}

function convertToPath(name:string) {
  return name.split(' ').join('_')
}

function convertFromPath(path:string) {
  return path.split('_').join(' ')
}

export default {
  async list() {
    const filePath = path.resolve(process.cwd(), 'data', 'products.json')
    const rawProducts = fs.readFileSync(filePath, 'utf8') 
    const products:Product[] = JSON.parse(rawProducts)
    const serializedProducts = products.map(product => {
      return {
        ...product,
        productPath: convertToPath(product.name)
      }
    })

    return serializedProducts
  },

  async show(name:string) {
    const products:Product[] = await this.list()
    const productName = convertFromPath(name)
    const product = products.find(product => product.name === productName)

    return product
  },

  async listPaths() {
    const products:Product[] = await this.list()
    const paths = products.map(product => ({ 
      params: { 
        name: convertToPath(product.name)
      }
    }))

    return paths
  }
}

