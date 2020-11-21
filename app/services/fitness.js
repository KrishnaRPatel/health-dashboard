import Service from "@ember/service";
import { PostgrestClient } from "@supabase/postgrest-js";
import ENV from "health-dashboard/config/environment";

export default class FitnessService extends Service {
  supabase = null;

  init() {
    super.init(...arguments);
    if (!this.supabase) {
      this.supabase = new PostgrestClient(ENV.supabase.SUPABASE_URL, {
        headers: {
          apiKey: ENV.supabase.SUPABASE_KEY,
          Authorization: `Bearer ${ENV.supabase.SUPABASE_KEY}`,
        },
      });
      // ENV.supabase.SUPABASE_URL,
      //   ENV.supabase.SUPABASE_KEY
    }
  }
}
