export const resolvers = {
  Query: {
    findUsers: (_parent: any, _args: any, db: any) => {
      return db.prisma.user.findMany()
    },
  },
}
