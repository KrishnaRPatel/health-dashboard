import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class HealthDetailsRoute extends Route {
  @service fitness;

  async model() {
    const keys = [
      "dates",
      "calories_active",
      "calories_passive",
      "flights",
      "steps",
      "distance",
      "exercise_time",
    ];
    const { data, error } = await this.fitness.supabase
      .from("fitness")
      .select(keys.join(","))
      .order("dates", { ascending: false })
      .limit(20);
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  }
}
