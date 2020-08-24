# WebdriverIO v6 Component Based Functional Testing Framework 

This automation framework has been implemented using WebdriverIO v6 using a Component-based Page Object Model.

Prerequisites:
- Node.js 12 (https://nodejs.org)
- Yarn (https://yarnpkg.com)

## Setup

- To download dependencies run `yarn` inside the project folder.

## Test run

- Run `yarn test:<size>`
  - eg: `yarn test:large`
  - Check package.json for the available scripts or run the following command in a terminal session within the project folder:
    
    `grep "scripts" -A 50 ./package.json | sed '/}/ q'`

## Test Result

- Once the test run is complete, the following folders will be created within the project folder:
  - errorShots: failure screenshots
  - logs: selenium standalone logs
  - allure-results: to be used by allure to generate reports
    - run `yarn allure:<size>` to generate and open the allure report for that breakpoint/browser size
    - eg: `yarn allure:large`
  
## Run a single test file

- Add `--spec <test filter>` to the command line when triggering a test run
  - eg: `yarn test:large --spec news*`

## Debugging tests

- to debug tests from VSCode create a launch.json file and add below configuration

         {
            "type": "node",
            "request": "launch",
            "protocol": "inspector",
            "port": 5859,
            "name": "WebdriverIO",
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/wdio",
            "windows": {
                "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/wdio.cmd"
            },
            "timeout": 1000000,
            "cwd": "${workspaceRoot}",
            "args":[
                 "wdio.conf.js"
            ]
          }

* Enable `debug` and `execArgv` in wdio.conf.js

## WebdriverIO documentation

For general documentation please visit: https://webdriver.io/docs/gettingstarted.html

For syntax, commands and APIs please visit: https://webdriver.io/docs/api.html

## TODO

- Component based Page Object Model
- Abstraction layer
- Code best practices
- Project structure
