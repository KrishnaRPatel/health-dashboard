import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { transformData } from "health-dashboard/utils/chart";

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
      .order("dates", { ascending: true })
      .gte("dates", "2020-01-01 00:00:00")
      .limit(365);
    if (error) {
      console.error(error);
    } else {
      return transformData(data, keys);
    }
  }
}
