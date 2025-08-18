import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      progress: {
        create: {}, // auto create UserProgress with default "Noob"
      },
    },
  })

  return new Response(JSON.stringify({ user }), { status: 201 })
}
