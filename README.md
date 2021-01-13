# Health-Dashboard

This is the https://tmi.krishnapa.tel/ health dashboard aka Krishna's TMI. It's meant as a health dashboard to track daily exercise activity.

## Prerequisites

A db with health info is required. Here is an example:

| dates      | calories_passive | calories active |
| ----------- | ----------- | ----------- |
| 2019-01-03 | 1972.76 | 574.602 |
| 2019-01-02 | 1945.61 | 431.924 |

`shapeData` and the other `chart.js` utils show what format the dashboard will work with.

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd health-dashboard`
* `yarn install` or `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Host static assets from the build process at root level (`example.com/`) or change the root url in the app build config.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
