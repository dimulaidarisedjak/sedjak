import { ref } from 'vue';

export default defineEventHandler(async (event) => {
  const queryData = getQuery(event);
  if (queryData) {
    if (queryData.options) {
      const domainResult = await useDrizzle().query.domains.findMany({
        columns: {
          id: true,
          name: true,
        },
        where: (domains, { eq }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(eq(domains.ownedBy, queryData.ownedBy.toString()));

          return conditions.length ? and(...conditions) : undefined;
        },
      });
      const activeWebsiteResult = ref<any>();
      activeWebsiteResult.value = await useDrizzle().query.webBuilds.findMany({
        with: {
          domain: true,
        },
        columns: {
          domain: true,
        },
        where: (webBuilds, { eq }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(
              eq(webBuilds.ownedBy, queryData.ownedBy.toString()),
            );

          return conditions.length ? and(...conditions) : undefined;
        },
      });
      activeWebsiteResult.value = activeWebsiteResult.value.map(
        (website: any) => {
          return { id: website.domain.id, name: website.domain.name };
        },
      );
      const availableDomain = domainResult.filter(
        (domain: any) =>
          !activeWebsiteResult.value.find(
            (website: any) => website.id === domain.id,
          ),
      );
      return availableDomain;
    } else {
      return await useDrizzle().query.domains.findMany({
        where: (domains, { eq, like }) => {
          const conditions = [];
          if (queryData.ownedBy)
            conditions.push(eq(domains.ownedBy, queryData.ownedBy.toString()));
          if (queryData.name)
            conditions.push(
              like(domains.name, `%${queryData.name.toString()}%`),
            );
          if (queryData.status)
            conditions.push(eq(domains.status, queryData.status.toString()));

          return conditions.length ? and(...conditions) : undefined;
        },
      });
    }
  }
});
