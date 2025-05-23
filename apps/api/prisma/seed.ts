import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'
import { PrismaClient } from '../src/generated/prisma'
import { generateSlug } from '../src/utils/generate-slug'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()
  await prisma.project.deleteMany()

  const passwordHash = hashSync('password', 2)

  // Create a 20 users
  const users = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      return await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          avatarUrl: faker.image.avatar(),
          passwordHash,
        },
      })
    })
  )

  // Create a 5 organizations with 4 users each
  const organizations = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const orgUsers = faker.helpers.arrayElements(
        users,
        faker.number.int({ min: 3, max: 5 })
      )
      const owner = orgUsers[0]
      const companyName = faker.company.name()
      return await prisma.organization.create({
        data: {
          name: companyName,
          slug: generateSlug(companyName),
          ownerId: owner.id,
          projects: {
            create: Array.from({ length: 3 }).map(() => ({
              name: faker.commerce.productName(),
              slug: generateSlug(faker.commerce.productName()),
              description: faker.commerce.productDescription(),
              owner: { connect: { id: owner.id } },
            })),
          },
          members: {
            create: orgUsers.map((user, idx) => ({
              userId: user.id,
              role: idx === 0 ? 'ADMIN' : 'MEMBER',
            })),
          },
        },
      })
    })
  )

  // Update para BILLING
  for (const org of organizations) {
    // Busca todos os membros da organização que não são ADMIN
    const members = await prisma.member.findMany({
      where: {
        organizationId: org.id,
        role: 'MEMBER',
      },
    })

    if (members.length > 0) {
      // Escolhe um membro aleatório para ser BILLING
      const billingMember = faker.helpers.arrayElement(members)
      await prisma.member.update({
        where: { id: billingMember.id },
        data: { role: 'BILLING' },
      })
    }
  }

  // console.log({ users, organizations })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
