export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  if (queryData) {
    return await useDrizzle().query.bills.findMany({
      where: (bills, { eq }) => {
        const conditions = [];
        if (queryData.ownedBy)
          conditions.push(eq(bills.ownedBy, queryData.ownedBy.toString()));
        if (queryData.status)
          conditions.push(eq(bills.status, queryData.status.toString()));

        return conditions.length ? and(...conditions) : undefined;
      },
    });
  }
});
