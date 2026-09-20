import { onRequest as submitLead } from './functions/api/submit-lead.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/submit-lead') {
      return submitLead({
        request,
        env,
        ctx,
        waitUntil: (promise) => ctx.waitUntil(promise),
        next: () => env.ASSETS.fetch(request),
      });
    }

    return env.ASSETS.fetch(request);
  }
};
