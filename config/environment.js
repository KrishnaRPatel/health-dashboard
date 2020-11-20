"use strict";

module.exports = function (environment) {
  let ENV = {
    modulePrefix: "ember-quickstart",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    firebase: {
      apiKey: process.env.FIREBASE_DEV_API_KEY,
      authDomain: "health-dashboard-7234e.firebaseapp.com",
      databaseURL: "https://health-dashboard-7234e.firebaseio.com",
      projectId: "health-dashboard-7234e",
      storageBucket: "health-dashboard-7234e.appspot.com",
      messagingSenderId: "1053734540949",
      appId: "1:1053734540949:web:b635ad95ab30cd02afed9c",
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    ENV.firebase.apiKey = process.env.FIREBASE_PROD_API_KEY;
    // here you can enable a production-specific feature
  }

  return ENV;
};
