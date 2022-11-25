import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'warn', 'error' ],
  errorFormat: 'pretty',
});

// async function main() {
//   const movie = await prisma.movie.create({data:{name:'kyle'}})
// }

// main().catch(e=>{
//   console.error(e.message)
// })
// .finally(async () =>{
//   await prisma.$connect();
// })

const connectDB = () => {
  try {
    prisma.$connect();
    console.log('Database Connected !');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { prisma, connectDB };
