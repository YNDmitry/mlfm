import { createDirectus, rest, aggregate, createItem, passwordRequest } from '@directus/sdk';

const directus = createDirectus('http://92.53.107.28/').with(rest());

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, aggregate, createItem, passwordRequest },
  };
});