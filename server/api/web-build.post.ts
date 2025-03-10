import { randomUUID } from 'uncrypto';
import { webBuilds } from '../database/schema';

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const jsonData = JSON.stringify(data.jsonData);

  const filename = `${randomUUID()}.json`;

  const blob = await hubBlob().put(filename, jsonData, {
    contentType: 'application/json',
    addRandomSuffix: false,
    prefix: 'webbuild',
  });

  console.log('blob', blob);

  if (blob.pathname) {
    const webBuildResult = await useDrizzle()
      .insert(webBuilds)
      .values({
        name: data.name,
        description: data.description,
        domain: data.domain,
        status: 'active',
        blobPath: blob.pathname,
        ownedBy: data.ownedBy,
      })
      .returning({ insertedId: tables.webBuilds.id });

    if (webBuildResult[0]?.insertedId) {
      return webBuildResult;
    }
  }

  return ['error'];
});
