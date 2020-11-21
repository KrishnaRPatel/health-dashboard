import Application from "health-dashboard/app";
import config from "health-dashboard/config/environment";
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";

setApplication(Application.create(config.APP));

start();
