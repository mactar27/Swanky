import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear DB
  await prisma.quoteRequest.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.tieredPrice.deleteMany()
  await prisma.product.deleteMany()

  console.log("Database cleared.")

  // Add Products
  const p1 = await prisma.product.create({
    data: {
      name: "Heavyweight Boxy Hoodie",
      description: "The ultimate hoodie for streetwear brands. Boxy fit, dropped shoulders, no drawstrings.",
      price: 25.0,
      gsm: 500,
      category: "Hoodies",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=800",
      stock: 1500,
      tieredPrices: {
        create: [
          { minQty: 20, price: 25.0 },
          { minQty: 50, price: 22.0 },
          { minQty: 100, price: 18.0 }
        ]
      }
    }
  })

  const p2 = await prisma.product.create({
    data: {
      name: "Oversized Vintage T-Shirt",
      description: "T-shirt with vintage wash effect, thick collar, and oversized fit.",
      price: 12.0,
      gsm: 250,
      category: "T-Shirts",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=800",
      stock: 3000,
      tieredPrices: {
        create: [
          { minQty: 20, price: 12.0 },
          { minQty: 50, price: 10.0 },
          { minQty: 100, price: 8.0 }
        ]
      }
    }
  })

  const p3 = await prisma.product.create({
    data: {
      name: "Fleece Sweatpants",
      description: "Heavy cotton sweatpants, straight cut, perfect for matching sets.",
      price: 20.0,
      gsm: 400,
      category: "Sweatpants",
      imageUrl: "https://images.unsplash.com/photo-1489987707023-afc82478163a?auto=format&fit=crop&q=80&w=600&h=800",
      stock: 800,
      tieredPrices: {
        create: [
          { minQty: 20, price: 20.0 },
          { minQty: 50, price: 18.0 },
          { minQty: 100, price: 15.0 }
        ]
      }
    }
  })

  // Add fake Quote requests
  await prisma.quoteRequest.create({
    data: {
      clientName: "Aesthetix Paris",
      clientEmail: "contact@aesthetix.fr",
      productType: "Heavyweight Boxy Hoodie",
      technique: "Embroidery (Chest)",
      status: "NOUVEAU"
    }
  })

  await prisma.quoteRequest.create({
    data: {
      clientName: "VZNRY",
      clientEmail: "hello@vznry.com",
      productType: "Oversized Vintage T-Shirt",
      technique: "Screen Printing (Full Back)",
      status: "TRAITE"
    }
  })

  // Add a fake order for the dashboard
  const order = await prisma.order.create({
    data: {
      orderNumber: "#1024",
      clientName: "Aesthetix Paris",
      clientEmail: "contact@aesthetix.fr",
      status: "EN_ATTENTE",
      total: 1250.0,
      items: {
        create: [
          {
            productId: p1.id,
            quantity: 50,
            price: 25.0
          }
        ]
      }
    }
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
