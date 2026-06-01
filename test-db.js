const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const quotes = await prisma.quoteRequest.findMany();
  console.log(quotes);
}
main().catch(console.error).finally(() => prisma.$disconnect());
