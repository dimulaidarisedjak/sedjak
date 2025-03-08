export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  if (queryData) {
    return await useDrizzle().query.domains.findMany({
      where: (domains, { eq, like }) => {
        const conditions = [];
        if (queryData.ownedBy)
          conditions.push(eq(domains.ownedBy, queryData.ownedBy.toString()));
        if (queryData.name)
          conditions.push(like(domains.name, `%${queryData.name.toString()}%`));
        if (queryData.status)
          conditions.push(eq(domains.status, queryData.status.toString()));

        return conditions.length ? and(...conditions) : undefined;
      },
    });
  }
});
