import { domains, bills } from '../database/schema';

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const years =
    new Date(data.expiredAt).getFullYear() - new Date().getFullYear();

  const billResult = await useDrizzle()
    .insert(bills)
    .values({
      name: 'Tagihan Pembelian Domain ' + data.name,
      description: 'Tagihan pembelian domain ' + data.name,
      status: 'unpaid',
      amount: 250000 * years,
      serviceType: 'domain',
      dueAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      ownedBy: data.ownedBy,
    })
    .returning({ insertedId: tables.bills.id });

  if (billResult[0]?.insertedId) {
    const domainResult = await useDrizzle()
      .insert(domains)
      .values({
        name: data.name,
        status: 'inactive',
        expiredAt: new Date(data.expiredAt),
        bill: billResult[0]?.insertedId,
        ownedBy: data.ownedBy,
      })
      .returning({ insertedId: tables.domains.id });

    if (domainResult[0]?.insertedId) {
      return domainResult;
    }
  }

  return ['error'];
});
