import Route from "@ember/routing/route";

export default Route.extend({
  model: function () {
    return this.store.query("health-detail", {
      orderBy: { publishedAt: "desc" },
      limit: 20,
    });
  },
});
