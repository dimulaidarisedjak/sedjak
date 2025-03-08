export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  console.log(queryData);
  if (queryData) {
    if (queryData.options && queryData.owned_by) {
      const usableEmailDomainResult = await useDrizzle().query.domains.findMany(
        {
          columns: {
            name: true,
          },
          where: (domains, { eq }) => {
            const conditions = [];
            if (queryData.ownedBy)
              conditions.push(
                eq(domains.ownedBy, queryData.ownedBy.toString()),
              );

            return conditions.length ? and(...conditions) : undefined;
          },
        },
      );
      const emailDomainResult = await useDrizzle().query.emailDomains.findMany({
        columns: {
          name: true,
        },
        where: (emailDomains, { eq }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(
              eq(emailDomains.ownedBy, queryData.ownedBy.toString()),
            );

          return conditions.length ? and(...conditions) : undefined;
        },
      });
      const intersection = usableEmailDomainResult.filter((domain: any) =>
        emailDomainResult.find(
          (emailDomain: any) => emailDomain.name !== domain.name,
        ),
      );
      return intersection;
    } else {
      return await useDrizzle().query.emailDomains.findMany({
        where: (emailDomains, { eq, like }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(
              eq(emailDomains.ownedBy, queryData.ownedBy.toString()),
            );
          if (queryData.name)
            conditions.push(like(emailDomains.name, `%${queryData.name}%`));
          if (queryData.status)
            conditions.push(
              eq(emailDomains.status, queryData.status.toString()),
            );

          return conditions.length ? and(...conditions) : undefined;
        },
      });
    }
  }
});
