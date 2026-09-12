export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    return response;
  }
};
