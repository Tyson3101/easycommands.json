# easycommands.json

## Description

### easycommands.json is an easy way to make discord commands by using a JSON file with input and output key value pairs instead of using a shit ton (Don't deny it) of if statements or switch cases that fill up your code by an unnecessary amount.

###### Note: See types at very bottem

## Example

##### Note: init refers to how you defined the easycommands.json module, which is what the example shows.

##### Note: Can use object instead of JSON File.

### Firstly install the package

```
npm i easycommands.json
```

### Secondly import the easycommands.json module

```js
// ES6 || TypeScript

import init from "easycommands.json";

// CommonJS

const init = require("easycommands.json");
```

## Short Info

### There are 2 approaches to the easy commands.

#### First way being to make a JSON File(s) which will be shown below. - Better because is a file, seperated from code. Easier and more simple to work with as a whole and for beginners. Unless need somewhat complicated commands. JSON is the way to go.

###### OR

#### Make an object(s) with the same format as the JSON File. - Better because have better functionatly, can make input be an array from other packages. Use of typescript interface which make it easier to work with.

## JSON File

### First make the JSON file

```js

{
  "prefix": [{}], // The prefix property is for inputs which need a prefix. OPTIONAL

  "noPrefix": [{}] // noPrefix property is for responding to plain message content. OPTIONAL
}

```

#### Both of noPrefix and prefix have the same properties

## JSON File example

```js
{

"prefix": [{

  "input": "rules", // Input to listen for. REQUIRED (If array, elements acts as aliases)

  "output": "**1.** No being rude.\n**2.** No Ads", // Output to respond. REQUIRED (If array gets random element)

"messageOptions": { // Discord MessageOptions with custom properties. DEFUALT: {}

  "split": true,

  "respondToSelf": false, // Custom Property which tells to respond to self or not. DEFUALT: FALSE

  "respondToBots": true, // Custom Property which tells to respond to other bots or not. DEFUALT: TRUE

  "respondToUsers": true, // Custom Property which tells to respond to other users. DEFUALT: TRUE

  "equalContent": false, // Custom Proerty which says to exacly equal input, or just include input. DEFAULT: TRUE

  "embed": { "title": "Check Rules Above!" } // Embed Object https://discordjs.guide/popular-topics/embeds.html#using-an-embed-object

  },
}],

"noPrefix": [{

  "input": ["Hello!", "Hey!", "Sup", "Nice to meet you"], // Input to listen for. REQUIRED (If array, elements acts as aliases)

  "output": ["Hey!", "GoodBye"], // Output to respond with. REQUIRED (If array gets random element)

"messageOptions": { // Discord Message Options
  "code": "json"
  },
}]
}

```

##### If copy, Remove code comments from JSON example

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

  commands: "./pathToJSONCommandsFile.json", // Path to JSON file(s) with commands OR JS object(s) of the shown JSON Format. REQUIRED

  logOnReady: true /* Only for outside event, will log on ready event if true which will log default, or string being own custom message.

DEFAULT: FALSE */,

  prefix: "!", // Prefix to check for the prefix property inputs. Defualt: ""

  reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE
}); // Returns Passed Client

/* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file/Object. */
```

## Example Code Inside Message Event

```js
const init = require("easycommands.json");

const { Client } = require("discord.js");

const client = new Client();

client.on("message", (msg) => {
  const prefix = ExampleDataBase.get(msg.guild.id); // Mocking DB Prefix

  /* ONLY CALL THE INIT FUNCTION ONCE */

  init(client /* Instantiated Client */, {
    // Options

    commands: [
      "./pathToJSONCommandsFile.json",
      "./anotherPathToJSONCommandsFile.json",
    ] /* Path to JSON file(s) with commands OR JS object(s)
of the shown JSON Format. REQUIRED */,

    prefix: prefix || "!", // Prefix to check for the prefix property inputs. Defualt: "" (Empty String)

    reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE

    message: msg, // Message object to access the content, etc properties. REQURIED INSIDE EVENT
  }); // Returns Passed Client

  /* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file/Object. */
});
```

## Object

## Object example

```js

// JavaScript

const { MessageEmbed } =  require("discord.js");

const  Commands  = { // Follows same format as JSON.

prefix: [{

  input: "rules", // Input to listen for. REQUIRED (If array, elements acts as aliases)

  output: "**1.** No being rude.\n**2.** No Ads", // Output to respond. REQUIRED (If array gets random element)

messageOptions: { // Discord MessageOptions with custom properties. OPTIONAL

  split: true,

  respondToSelf: false, // Custom Property which tells to respond to self or not. DEFUALT: FALSE

  respondToBots: true, // Custom Property which tells to respond to other bots or not. DEFUALT: TRUE

  respondToUsers: true, // Custom Property which tells to respond to other users. DEFUALT: TRUE

  equalContent: false, // Custom Proerty which says to exacly equal input, or just include input. DEFAULT: TRUE

  embed: new  MessageEmbed().setTitle("Check Rules above") // Messagembed Constructor https://discordjs.guide/popular-topics/embeds.html#using-the-richembedmessageembed-constructor

  },
}],

noPrefix: [{

  input: ["Hello!", "Hey!", "Sup", "Nice to meet you"], // Input to listen for. REQUIRED (If array, elements acts as aliases)

  output: ["Hey!", "GoodBye"], // Output to respond with. REQUIRED (If array gets random element)

messageOptions: {
  code: "json"
  },
}]
}

// TypeScript

import  init, { CommandObject } from  "easycommands.json";

const  Commands: CommandObject  /* TS Interface for command */ {

// ...

}

```

### Now either call the init function inside or outside the message event.

## Example Code Outside Event

```js
const init = require("easycommands.json");

const { Client, MessageEmbed } = require("discord.js");

const client = new Client();

const Commands = {
  /* Put example object here */
};

// Outside Event

init(client /* Instantiated Client */, {
  // Options

  commands: Commands, // Path to JSON file(s) with commands OR JS object(s) of the shown JSON Format. REQUIRED

  logOnReady: true /* Only for outside event, will log on ready event if true which will log default, or string being own custom message.

DEFAULT: FALSE */,

  prefix: "!", // Prefix to check for the prefix property inputs. Defualt: "" (Empty String)

  reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE
}); // Returns Passed Client

/* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file/Object. */
```

## Example Code Inside Message Event

```js
const init = require("easycommands.json");

const { Client, MessageEmbed } = require("discord.js");

const client = new Client();

const Commands = {
  /* Put example object here */
};

client.on("message", (msg) => {
  const prefix = ExampleDataBase.get(msg.guild.id); // Mocking DB Prefix

  /* ONLY CALL THE INIT FUNCTION ONCE */

  init(client /* Instantiated Client */, {
    // Options

    commands: [Commands, OptionalCommands2], // Path to JSON file(s) with commands OR JS object(s) of the shown JSON Format. REQUIRED

    prefix: prefix || "!", // Prefix to check for the prefix property inputs. Defualt: "" (Empty String)

    reply: false, // Use message.reply if true for responding to commands. DEFAULT: FALSE

    message: msg, // Message object to access the content, etc properties. REQURIED INSIDE EVENT
  }); // Returns Passed Client

  /* Note: init Function Adds commandsJSON property to client, value being the parsed JSON file/Object. */
});
```

## More info

### Commands property of initOptions allow array of files and objects.

```js

// File Paths to JSON and Objects

init(client, {

  commands: ["./commands1.json". "./commands2.json", { prefix: []}, { noPrefix: []}, { prefix: [], noPrefix: []}]

});

// Just File Paths to JSON

init(client, {

  commands: ["./commands1.json". "./commands2.json"]

});

// Just Objects

init(client, {

  commands: [{ prefix: []}, { noPrefix: []}, { prefix: [], noPrefix: []}]

});

```

## Types

##### Note: To have access to the interfaces shown below, destructre the pacakge, eg:

```ts
import init, { <INTERFACE> } from "easycommands.json";
```

## initOptions

```ts
import DISCORDJS from "discord.js";

interface initOptions {
  command: string | CommandObject | Array<string | CommandObject>;

  logOnReady?: string | boolean;

  prefix?: string;

  reply?: boolean;

  message?: DISCORDJS.Message;
}

import init, { initOptions } from "easycommands.json";

init(DISCORDJS.Client, initOptions);
```

## CommandObject

```ts
interface CommandObject {
  prefix?: Command[];

  noPrefix?: Command[];
}

import init, { CommandObject } from "easycommands.json";

const commands: CommandObject = {
  noPrefix: [],
  prefix: [],
};
```

## Command

```ts
import DISCORDJS from "discord.js";

interface Command {
  input: string | string[];

  output: string | string[];

  messageOptions?: DISCORDJS.MessageOptions;
}

import init, { Command } from "easycommands.json";

const command: Command = {
  input: "",
  output: "",
};
```
