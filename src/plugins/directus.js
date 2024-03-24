import { createDirectus, rest, aggregate, createItem, passwordRequest } from '@directus/sdk';

const directus = createDirectus(process.env.DATABASE_URL).with(rest());

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, aggregate, createItem, passwordRequest },
  };
});