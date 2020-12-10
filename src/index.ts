import { Client, Message, MessageOptions } from "discord.js";
import * as fs from "fs";

interface Options {
  path: string;
  logOnReady?: string | boolean;
  prefix?: string;
  reply?: boolean;
  message?: Message;
}

interface Command {
  input: string | string[];
  output: string | string[];
  messageOptions: MessageOptions;
}

interface JSONFile {
  prefix: Command[];
  noPrefix: Command[];
}

declare module "discord.js" {
  interface Client {
    commandsJSON?: JSONFile;
  }
}

function init(client: Client, options: Options) {
  const path = options.path;
  const prefix = options.prefix;
  if (!path.endsWith(".json"))
    throw new TypeError(
      `[Invaild Path]: Path provied either isn't a json file or doesn't excist.\nPath: ${path}`
    );
  const objOfCommands: JSONFile = JSON.parse(
    fs.readFileSync(
      `${path.endsWith(".json") ? path : path + ".json"}`,
      "utf-8"
    )
  );
  if (!objOfCommands)
    throw new TypeError(
      `[Invaild Path]: Path provied either isn't a json file or doesn't excist.\nPath: ${path}`
    );
  try {
    if (options.logOnReady && !options.message) {
      client.on("ready", () =>
        console.log(
          options.logOnReady === true
            ? "All replies loaded."
            : options.logOnReady
        )
      );
    }

    client.commandsJSON = objOfCommands;

    function sendMessage(message: Message) {
      let found = false;
      if (prefix && objOfCommands["prefix"]) {
        const command = objOfCommands["prefix"].find(({ input: inputs }) => {
          if (Array.isArray(inputs))
            return inputs.some((input) => message.content.includes(input));
          else return message.content.includes(inputs);
        });
        if (command) {
          found = true;
          const output = command.output;
          if (Array.isArray(output)) {
            options.reply
              ? message.reply(
                  output[Math.floor(Math.random() * output.length)],
                  command.messageOptions
                )
              : message.channel.send(
                  [Math.floor(Math.random() * output.length)],
                  command.messageOptions
                );
          } else {
            options.reply
              ? message.reply(command.output, command.messageOptions)
              : message.channel.send(command.output, command.messageOptions);
          }
        }
      }
      const command = objOfCommands["noPrefix"].find(({ input: inputs }) => {
        if (Array.isArray(inputs))
          return inputs.some((input) => message.content.includes(input));
        else return message.content.includes(inputs);
      });
      if (command && !found) {
        const output = command.output;
        if (Array.isArray(output)) {
          options.reply
            ? message.reply(
                output[Math.floor(Math.random() * output.length)],
                command.messageOptions
              )
            : message.channel.send(
                [Math.floor(Math.random() * output.length)],
                command.messageOptions
              );
        } else {
          options.reply
            ? message.reply(command.output, command.messageOptions)
            : message.channel.send(command.output, command.messageOptions);
        }
      }
    }
    if (!options.message) {
      return client.on("message", sendMessage);
    } else {
      sendMessage(options.message);
    }
  } catch (e) {
    throw e;
  }
}

export default init;
