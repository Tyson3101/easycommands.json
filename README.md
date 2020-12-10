# easycommands.json

## Description

### easycommands.json is an easy way to make commands by using a JSON file with input and output key value pairs instead of using a shit ton of if statements or switch cases that fill up your code by an unnecessary amount.

## Example

##### Note: init refers to how you defined the easycommands.json module, which is what the example shows.

### Firstly import the easycommands.json module

```js
// ES6 || TypeScript
import init from "easycommands.json";

// CommonJS
const init = require("easycommands.json");
```

### Secondly make the JSON file

```js
{
  "prefix": [{}], // The prefix property is for inputs which need a prefix. OPTIONAL
  "noPrefix": [{}]  // noPrefix property is for responding to plain message content. OPTIONAL
}
```

### Both of noPrefix and prefix have the same properties

## JSON File example

```js
{
  "prefix": [{
    "input": "rules", // Input to listen for. REQUIRED (If array, elements acts as aliases)
    "output": "**1.** No being rude.\n**2.** No Ads" // Output to respond. REQUIRED (If array gets random element)
    "messageOptions": { // Discord MessageOptions. OPTIONAL
      split: true,
    },
  }],
  "noPrefix": [{
    "input": ["Hello!", "Hey!"], //  Input to listen for. REQUIRED  (If array, elements acts as aliases)
    "output": ["Hey!", "GoodBye"] // Output to respond with. REQUIRED (If array gets random element)
  }]
}
```

##### If copy, Remove comments from JSON example

### Now either call the init function inside or outside the message event.

## Example Code Outside Event

```js
const init = require("easycommands.json");
const { Client } = require("discord.js");
const client = new Client();

/* ONLY CALL THE INIT FUNCTION ONCE */

// Outside Event
init(client /* Client Object */, {
  // Options
  path: "./pathToJSONCommandsFile.json", // Path to JSON file with commands. REQUIRED

  logOnReady: true /*  Only for outside event, will log on ready event if true which will log default, or string being own custom message.
  DEFAULT: FALSE */,

  prefix: "!", // Prefix to check for the prefix property inputs. Defualt: "" (Empty String)

  reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE
}); // Returns passed Client object
/* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file. */
```

## Example Code Inside Message Event

```js
const init = require("easycommands.json");
const { Client } = require("discord.js");
const client = new Client();

client.on("message", (msg) => {
  const prefix = ExampleDataBase.get(msg.guild.id); // Mocking DB Prefix

  /* ONLY CALL THE INIT FUNCTION ONCE */

  init(client /* Instanated Client */, {
    // Options

    path: "./pathToJSONCommandsFile.json", // Path to JSON file with commands. REQUIRED

    prefix: prefix ?? "!", // Prefix to check for the prefix property inputs. Defualt: "" (Empty String)

    reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE

    message: msg, // Message object to access the content, etc properties. REQURIED
  }); // Returns Message Object Of Reply || Passed Client
  /* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file. */
});
```
