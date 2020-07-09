import * as Discord from "discord.js";
import * as fs from "fs";
import { Config, loadConfig } from "~/config";
import { Command, CommandHandler, CommandResult } from "~/commands";
import HelpCommand from "~/commands/command_help";
import { gray, red } from "chalk";

const config: Config = loadConfig();
const token: string = fs.readFileSync(".token").toString();
const client = new Discord.Client();
const cmdHandler = new CommandHandler(config.commandPrefix);

console.log(`PREFIX: ${red(config.commandPrefix)}`);
cmdHandler.registerCommands([new HelpCommand()]);

client.on("ready", () => console.log(gray`\n${client.user?.tag} is now ready`));
client.on("message", (msg) => cmdHandler.run(msg));

if (token === undefined || token.length < 1) {
  console.error(red`no token is provided in the .token file `);
  process.exit(1);
}
client.login(token);
