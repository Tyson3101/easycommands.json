import { Client, Message, MessageOptions } from "discord.js";
import * as fs from "fs";
import { type } from "os";

export interface initOptions {
  command: string | CommandObject | Array<string | CommandObject>;
  logOnReady?: string | boolean;
  prefix?: string;
  reply?: boolean;
  message?: Message;
}

export interface Command {
  input: string | string[];
  output: string | string[];
  messageOptions?: MessageOptions;
}

export interface CommandObject {
  prefix?: Command[];
  noPrefix?: Command[];
}

declare module "discord.js" {
  interface Client {
    commandsJSON?: CommandObject;
  }
  interface MessageOptions {
    respondToBots?: boolean;
    respondToSelf?: boolean;
    respondToUsers?: boolean;
    equalContent?: boolean;
  }
}

function init(client: Client, options: initOptions) {
  const path = options.command;
  const prefix = options.prefix;
  if (!["string", "object"].includes(typeof path))
    throw new TypeError(
      `[Invaild Path]: Path provied either isn't a json file or doesn't excist.\nPath: ${path}`
    );
  try {
    let objOfCommands: CommandObject = getCommandObj(options);
    if (!objOfCommands)
      throw new TypeError(
        `[Invaild Path|Object]: Path provied either isn't a json file or doesn't excist. Or object doesn't have correct properties.`
      );
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
      if (
        prefix &&
        objOfCommands["prefix"] &&
        message.content.toLowerCase().trim().startsWith(prefix)
      ) {
        const command = objOfCommands["prefix"].find(
          ({ input: inputs, messageOptions }) => {
            if (Array.isArray(inputs))
              return inputs.some((input) => {
                if (messageOptions?.equalContent === false)
                  return message.content
                    .toLowerCase()
                    .includes(input.toLowerCase());
                else
                  return (
                    message.content
                      .toLowerCase()
                      .slice(prefix.length)
                      .trim() === input.toLowerCase().trim()
                  );
              });
            else {
              if (messageOptions?.equalContent === false)
                return message.content
                  .toLowerCase()
                  .includes(inputs.toLowerCase());
              else
                return (
                  message.content.toLowerCase().slice(prefix.length).trim() ===
                  inputs.toLowerCase().trim()
                );
            }
          }
        );
        if (command) {
          if (
            command.messageOptions?.respondToBots === false &&
            message.author.bot
          )
            return;
          else if (
            !command.messageOptions?.respondToSelf &&
            message.author.id === client.user?.id
          )
            return;
          else if (
            command.messageOptions?.respondToUsers === false &&
            !message.author.bot
          )
            return;

          delete command.messageOptions?.respondToBots;
          delete command.messageOptions?.respondToUsers;
          delete command.messageOptions?.respondToSelf;
          found = true;
          const output = command.output;
          if (Array.isArray(output)) {
            options.reply
              ? message.reply(
                  output[Math.floor(Math.random() * output.length)],
                  command.messageOptions ? command.messageOptions : {}
                )
              : message.channel.send(
                  output[Math.floor(Math.random() * output.length)],
                  command.messageOptions ? command.messageOptions : {}
                );
          } else {
            options.reply
              ? message.reply(
                  command.output,
                  command.messageOptions ? command.messageOptions : {}
                )
              : message.channel.send(
                  command.output,
                  command.messageOptions ? command.messageOptions : {}
                );
          }
        }
      }

      const command = objOfCommands["noPrefix"]?.find(
        ({ input: inputs, messageOptions }) => {
          if (Array.isArray(inputs))
            return inputs.some((input) => {
              if (messageOptions?.equalContent === false)
                return message.content
                  .toLowerCase()
                  .includes(input.toLowerCase());
              else
                return (
                  message.content.toLowerCase().trim() === input.toLowerCase()
                );
            });
          else {
            if (messageOptions?.equalContent === false)
              return message.content
                .toLowerCase()
                .includes(inputs.toLowerCase());
            else
              return (
                message.content.toLowerCase().trim() ===
                inputs.toLowerCase().trim()
              );
          }
        }
      );
      if (command && !found) {
        if (
          command.messageOptions?.respondToBots === false &&
          message.author.bot
        )
          return;
        else if (
          !command.messageOptions?.respondToSelf &&
          message.author.id === client.user?.id
        )
          return;
        else if (
          command.messageOptions?.respondToUsers === false &&
          !message.author.bot
        )
          return;
        delete command.messageOptions?.respondToBots;
        delete command.messageOptions?.respondToUsers;
        delete command.messageOptions?.respondToSelf;
        const output = command.output;
        if (Array.isArray(output)) {
          options.reply
            ? message.reply(
                output[Math.floor(Math.random() * output.length)],
                command.messageOptions ? command.messageOptions : {}
              )
            : message.channel.send(
                output[Math.floor(Math.random() * output.length)],
                command.messageOptions ? command.messageOptions : {}
              );
        } else {
          options.reply
            ? message.reply(
                command.output,
                command.messageOptions ? command.messageOptions : {}
              )
            : message.channel.send(
                command.output,
                command.messageOptions ? command.messageOptions : {}
              );
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

function getCommandObj(options: initOptions): CommandObject {
  const Command = options.command;
  let commandObject: CommandObject = {
    noPrefix: [],
    prefix: [],
  };

  if (Array.isArray(Command)) {
    Command.forEach((commandStrOrObj: any) => {
      let command: CommandObject;
      if (typeof commandStrOrObj === "string")
        command = JSON.parse(fs.readFileSync(commandStrOrObj, "utf-8"));
      else command = commandStrOrObj;

      if (command?.noPrefix && commandObject?.noPrefix) {
        for (let key in command?.noPrefix) {
          commandObject.noPrefix.push(command.noPrefix[key]);
        }
      }

      if (command?.prefix && commandObject?.prefix) {
        for (let key in command.prefix) {
          commandObject.prefix.push(command.prefix[key]);
        }
      }
    });
  } else {
    if (typeof Command === "string")
      commandObject = JSON.parse(fs.readFileSync(Command, "utf-8"));
    else commandObject = Command;
  }

  //@ts-ignore
  return commandObject;
}
