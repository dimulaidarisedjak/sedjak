export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  if (queryData) {
    if (queryData.builder) {
      return await hubBlob().get(`webbuild/${queryData.uuid}.json`);
    } else {
      return await useDrizzle().query.webBuilds.findMany({
        where: (webBuilds, { eq }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(
              eq(webBuilds.ownedBy, queryData.ownedBy.toString()),
            );

          return conditions.length ? and(...conditions) : undefined;
        },
      });
    }
  }
});
