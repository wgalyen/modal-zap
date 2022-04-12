# ModalZap

ModalZap automatically removes content blocking modals including paywalls, 
discount offers, prompts to sign up or enter your email address and more.

Modal dialogs such as paywalls, discount offers, cookie prompts and GDPR 
banners are user-hostile interfaces that demand your attention and interrupt
your browsing experience. This extension puts you back in control, letting you
focus on the content.

***Please note:** this extension is in early development. You can help by reporting
websites with modals that didn't get blocked, or by creating your own
definitions and sharing them with us and the community. The aim is to build up
a comprehensive set of rules over time to block modals anywhere.*
# Specification
## Modal types
| Type | Description  |
|--|--|
| `consent`  | Cookie and GDPR notices. |
| `donate`   | Prompts to make a donation. |
| `email`    | Prompts to enter your email address. |
| `message`  | General messages and notifications. |
| `offer`    | Promotions and discounts. |
| `paywall`  | Prompts to sign up for a paid subscription. |
| `signup`   | Prompts to create an account. |
## Definitions
Definitions are located in [`/definitions`](/definitions), file-separated by modal type. Definitions are grouped by URL pattern.
```javascript
{
  "<glob> [ <glob> ... ]": { // URL pattern
    // Definition
    "if <function> [ <function> ... ]": { // Condition
      "<selector>": "<function> [ <argument> ... ]" // Action
    },
    // Definition (shorthand, no condition)
    "<selector>": "<function> [ <argument> ... ]" // Action
  }
}
```
**Examples**
```javascript
{
  "*.example.com *.example.org": {
    "if $(.modal)": {
      ".modal": "remove" // Remove element if present
    },
    ".modal": "addClass hide" // Remove element (shorthand)
    "if defined(ModalDialog)": {
      "ModalDialog.close": "call" // Call function if defined
    },
    "if defined(ModalDialog)": {
      "ModalDialog.setClosed": "call true" // Call function with arguments
    },      
  }
}
```
## URL pattern
URL patterns are defined as [globs](https://en.wikipedia.org/wiki/Glob_(programming)), allowing wildcards (`*`).
| Glob | Matches |
|--|--|
| `*` | Any URL. |
| `*.example.com` | Apex domain and any subdomain, e.g. `example.com`, `www.example.com`.
| `example.com example.org` | `example.com` and `example.org`.
| `*.example.com/*/about` | E.g. `www.example.com/en/about`.
## Conditions
Conditions start with `if`, followed by one or more functions. If all functions evaluate to `true`, the specified actions are run.
### Functions
| Function | Argument | Description |
|--|--|--|
| `$()` | [Query selector](https://developer.mozilla.org/docs/Web/API/Document/querySelector) | Tests if an HTML element exists. |
| `defined()` | JavaScript property | Tests if a JavaScript property exists. |
## Actions
Actions are run when the condition is met, or if no condition is specified.
### Functions
| Function | Argument | Description |
|--|--|--|
| `remove` |  | Remove the HTML element
| `addClass` | Class name | Add a class
| `removeClass` | Class name | Remove a class
| `call` |  | Call the function. Any arguments will be passed to the function.
