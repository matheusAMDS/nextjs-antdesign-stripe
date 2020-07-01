import Stripe from 'stripe'

import stripeConfig from '../config/stripe'

export interface Product {
  imgUrl: string;
  name: string;
  price: number;
  productId: string;
  priceId: string;
}

const stripe = new Stripe(stripeConfig.secret_key, {
  apiVersion: '2020-03-02'
})

export default {
  async list() {
    const prices = await stripe.prices.list({ type: 'one_time' })
    const products = prices.data.slice(0,9).map(async price => {
      const productId = price.product as string
      const product = await stripe.products.retrieve(productId)

      return {
        imgUrl: product.images[0],
        name: product.name,
        price: price.unit_amount / 100,
        productId: product.id,
        priceId: price.id
      }
    })

    return Promise.all(products)
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

