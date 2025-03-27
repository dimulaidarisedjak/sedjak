import { randomUUID } from 'uncrypto';

export default defineEventHandler(async (event) => {
  console.log('bruh');

  const form = await readFormData(event);
  const file = form.get('image') as File;

  console.log('form', form);

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: 'No file provided' });
  }

  ensureBlob(file, {
    maxSize: '4MB',
    types: ['image'],
  });

  const filename = randomUUID();
  const putBlob = await hubBlob().put(filename, file, {
    addRandomSuffix: false,
    prefix: 'image/',
  });
  console.log('putBlob', putBlob);
  return putBlob;
});
