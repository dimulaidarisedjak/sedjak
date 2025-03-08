import { ref } from 'vue';
import { bills, domains, emailDomains } from '../database/schema';

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log(data);
  if (data.id && data.status && data.serviceType) {
    const billResult = await useDrizzle()
      .update(bills)
      .set({ status: data.status })
      .where(eq(bills.id, data.id))
      .returning({ insertedId: tables.bills.id });

    if (billResult[0]?.insertedId) {
      const secResult: any = ref([]);
      if (data.serviceType === 'domain') {
        secResult.value = await useDrizzle()
          .update(domains)
          .set({ status: 'active' })
          .where(eq(domains.bill, data.id))
          .returning({ insertedId: tables.domains.id });
      } else if (data.serviceType === 'email') {
        secResult.value = await useDrizzle()
          .update(emailDomains)
          .set({ status: 'active' })
          .where(eq(emailDomains.bill, data.id))
          .returning({ insertedId: tables.emailDomains.id });
      }

      if (secResult.value[0]?.insertedId) {
        return billResult;
      }
    }
  } else {
    return ['error'];
  }
});
