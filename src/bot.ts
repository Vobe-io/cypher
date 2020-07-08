import * as Discord from "discord.js";
import * as fs from "fs";
import * as chalk from "chalk";
import { Config, loadConfig } from "./config";

const client = new Discord.Client();
const config: Config = loadConfig();
const token: string = fs.readFileSync(".token").toString();

client.on("ready", () => console.log(`${client.user?.tag} is now ready`));

if (token === undefined || token.length < 1) {
  console.error(
    chalk.red(
      "no token is provided in the .token file or as the TOKEN environment variable"
    )
  );
  process.exit(1);
}
client.login(token);
