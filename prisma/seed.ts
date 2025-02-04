import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: [
      { title: "Inception", description: "Thriller sulla manipolazione del sogno.", image: "/inception.jpg", trailerUrl: "YoHD9XEInc0" },
      { title: "Interstellar", description: "Viaggio tra le stelle alla ricerca di un nuovo pianeta.", image: "/interstellar.jpg", trailerUrl: "zSWdZVtXT7E" },
      { title: "Dune", description: "Battaglia per il controllo delle risorse su un pianeta desertico.", image: "/dune.jpg", trailerUrl: "8g18jFHCLXk" }
    ]
  });

  console.log("✅ Dati inseriti con successo!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
