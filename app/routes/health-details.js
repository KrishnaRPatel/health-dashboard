import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class HealthDetailsRoute extends Route {
  @service fitness;

  async model() {
    const { data, error } = await this.fitness.supabase
      .from("fitness")
      .select("dates, distance")
      .limit(10);
    if (error) {
      throw error;
    } else {
      return data;
    }
  }
}
