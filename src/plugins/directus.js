import { createDirectus, rest, aggregate, createItem, passwordRequest } from '@directus/sdk';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const directus = createDirectus(config.public.databaseUrl).with(rest());
  return {
    provide: { directus, aggregate, createItem, passwordRequest },
  };
});