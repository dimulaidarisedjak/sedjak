import { emailDomains, bills } from '../database/schema';

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log(data);
  const years =
    new Date(data.expiredAt).getFullYear() - new Date().getFullYear();

  const billResult = await useDrizzle()
    .insert(bills)
    .values({
      name: 'Tagihan Pembelian Domain Email ' + data.name,
      description: 'Tagihan pembelian domain email ' + data.name,
      status: 'unpaid',
      amount: 200000 * years,
      serviceType: 'email',
      dueAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      ownedBy: data.ownedBy,
    })
    .returning({ insertedId: tables.bills.id });

  if (billResult[0]?.insertedId) {
    const emailDomainResult = await useDrizzle()
      .insert(emailDomains)
      .values({
        name: data.name,
        status: 'inactive',
        expiredAt: new Date(data.expiredAt),
        bill: billResult[0]?.insertedId,
        ownedBy: data.ownedBy,
      })
      .returning({ insertedId: tables.emailDomains.id });

    if (emailDomainResult[0]?.insertedId) {
      return emailDomainResult;
    }
  }

  return ['error'];
});
