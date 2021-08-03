# WebdriverIO v6 Component Based Functional Testing Framework 

This automation framework has been implemented using WebdriverIO v6 using a Component-based Page Object Model.

Prerequisites:
- Node.js 12 (https://nodejs.org)
- Yarn (https://yarnpkg.com)

## Setup

- To download dependencies run `yarn` inside the project folder.

## Component based page object model
This automation framework has been refactored to use a Component-based Page Object Model.
Each component in the web application being tested should mirror a component object in the automation code.

Each component should be a `class` that extends the base `Component`.
This base class contains the initial abstraction layer for interaction between the tests and the test automation framework (can be used with other Javascript based automation frameworks).
Any function relevant to all components should be stored in the `Component` object.

The `Component` object extends `WebElement` which contains the logic for the selectors/locators.
Anything that might be related to the locators' strategy will use `WebElement` (or `WebElements` for list of elements).

Example of Component based functions:
```
isVisible()
isVisibleCurrently()
click()
getAttribute()
waitUntilVisible()
```

Example of WebElement based functions:
```
getSelector()
append()
appendTestId()
```

---
### Locators

The `data-testid` attribute is used to fetch the element we will be interacting with.
If an element in the DOM does not currently contain a `data-testid`, we should add it to the React component (can use [BEM](http://getbem.com/introduction/) methodology for consistency purposes).

Inside a page object, we can use `testId()` to fetch an element by the `data-testid`.

We can define the elements' attribute used in the code in global.ts file:
```javascript
export const TEST_ID = 'data-testid';
```

_In some cases, where the element does not have a testid, we can use CSS Selectors to identify it._

#### Page Object example
```javascript
class ResetPasswordPage {
  usernameField() {
    this.userInputField = this.userInputField ||
      new InputBox('input[name="userInput"]');
    return this.userInputField;
  }

  sendButton() {
    this.sendButtonComponent = this.sendButtonComponent ||
      new Button(testId('reset__submitButton'));
    return this.sendButtonComponent;
  }

  confirmationMessage() {
    this.confirmationMsgComponent = this.confirmationMsgComponent ||
      new Text(testId('confirmation__message'));
    return this.confirmationMsgComponent;
  }
}

export default ResetPasswordPage;
```

Whilst inside a component object we should always append the locator to the parent via `this.append()` or `this.appendTestId()`.


#### Component example
```javascript
class Header extends Component {
  sellLink() {
    this.sellLinkComponent = this.sellLinkComponent ||
      new Link(this.appendTestId('navigation__list'));
    return this.sellLinkComponent;
  }

  profileDropdown() {
    this.profileDropdownComponent = this.profileDropdownComponent ||
      new ProfileDropdown(this.appendTestId('navigation__profile'));
    return this.profileDropdownComponent;
  }
}

export default Header;
```

#### Locator strategy
Both page objects and components are very similar, with the main difference being that in component classes we append the child components' locators to the parent.
We could treat a page object as a first level component (no parent).

All components should have a locator assigned and, except for components within a page object, all should append its locator to its parent.
This is done via the append commands (eg: `this.append()`, `this.appendTestId()`).

**_Example 1_**:
```javascript
this.appendTestId('some__field')
```
- appends `[data-testid='some__field']` to the parent locator.

**_Example 2_**:

Given we have a page object with a *Header* component:
```javascript
class PageObject {
  header() {
    this.headerComponent = this.headerComponent ||
      new Header(testId('header'));
    return this.headerComponent;
  }
}

export default PageObject;
```
And the Header component contains the following child component:
```javascript
class SomeComponent extends Component {
  sellLink() {
    this.sellLinkComponent = this.sellLinkComponent ||
      new Link(this.appendTestId('navigation__list'));
    return this.sellLinkComponent;
  }
}

export default SomeComponent;
```

> **header**
- component of type `Header`
- first-level component, no parent
- located via `[data-testid='header']`

> **sellLink**
- component of type `Link`
- child of `Header` component
- located via `[data-testid='header'] [data-testid='navigation__list']` 

All locators should be in [CSS Selector](https://www.w3schools.com/cssref/css_selectors.asp) format.

Not that we are lazy instantiating all components. Whenever possible we should lazy instantiate all components to avoid storing components in memory when not being accessed.
Not usually an issue in test automation frameworks, but it is good practice to do so. Not mandatory though.

#### Element lists
In some tests we will need to interact with lists of elements in the page where the individual component usage is not suitable.
For this purpose we can use the `ElementList` object.
`ElementList` should be used when we have a list of elements in the DOM, usually generated by a `.map()` in the application code.

To use `ElementList` we require 2 parameters:
* locator
    * This should be the CSS selector common to all elements in the list _(not the parent container)_.
* Type
    * The type will be the Component type for the individual elements of the list.
    * This will allow us to use each individual element as a component of a certain type _(example below)_.

Example HTML:
<p align="center">
  <img src="images/element-list.png" align="center" alt="HTML with a list of elements">
</p>

In the example above, the locator would be `testId('message')`. Eg:
```javascript
class MessagePanel extends Component {
  messages() {
    this.messagesList = this.messagesList || new ElementList(this.appendTestId('message'), Text);
    return this.messagesList;
  }
}

export default MessagePanel;
```
After instantiating the object we can access both ElementList's and individual component's functions/attributes.

Example of ElementList commands:
* Count number of messages: `messages().length()`
* Click third element in the list: `messages().clickIndex(2)`

Examples of accessing an individual Component _(`Text` component in the example above)_:
```javascript
// Gets first element matching the locator and returns a component of the specified type
// In this case it returns a Text component
const firstMessage = messages().getComponent(0);
```
* Get first message's text: `firstMessage.getText()`
* Click the message: `firstMessage.click()`
* Wait for message to be displayed:  `firstMessage.waitUntilVisible()`

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

- Abstraction layer
- Code best practices
- Project structure
