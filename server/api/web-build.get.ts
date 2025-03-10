export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  console.log('gagaga', queryData);
  if (queryData) {
    return await useDrizzle().query.webBuilds.findMany({
      where: (webBuilds, { eq }) => {
        const conditions = [];
        if (queryData.ownedBy)
          conditions.push(eq(webBuilds.ownedBy, queryData.ownedBy.toString()));

        return conditions.length ? and(...conditions) : undefined;
      },
    });
  }
});
