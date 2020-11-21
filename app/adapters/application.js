import RESTAdapter from "@ember-data/adapter/rest";
import { computed } from "@ember/object";
import ENV from "health-dashboard/config/environment";

export default RESTAdapter.extend({
  host: ENV.supabase.SUPABASE_URL,
  namespace: "rest/v1",
  headers: computed(function () {
    return {
      API_KEY: ENV.supabase.SUPABASE_KEY,
      ANOTHER_HEADER: "Some header value",
    };
  }),
});
