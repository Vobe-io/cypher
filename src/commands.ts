import { readFileSync } from "fs";
import * as chalk from "chalk";
import { MessageEmbed, Message } from "discord.js";

const { red, green, gray, bold } = chalk;

interface CommandResult {
  ok: boolean;
  returnToSender: boolean;
  message: string | MessageEmbed;
}

abstract class Command {
  public cmd: string;
  public help: string;
  public enabled: boolean;

  run(msg: Message): CommandResult {
    return {
      ok: true,
      returnToSender: false,
      message: "",
    };
  }
}

class CommandHandler {
  commands: Command[] = [];
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix ?? "!";
  }

  run(msg: Message): boolean | CommandResult[] {
    const commands = this.commands.filter((c) =>
      msg.cleanContent.startsWith(this.prefix + c.cmd.toLowerCase())
    );
    const results = commands.map((cmd) => cmd.run(msg));
    results
      .filter((res) => res.returnToSender)
      .forEach((res) => msg.channel.send(res.message));
    return commands.length > 0 && results.length > 0 && results;
  }

  registerCommand(cmd: Command): boolean {
    const hasDuplicate = this.commands
      .map((cmd) => cmd.cmd)
      .includes(cmd.cmd.toLowerCase());

    if (hasDuplicate) {
      console.log(red`\tERROR\t` + gray`${cmd.cmd}`);
      console.error(bold.red`Duplicate command '${cmd.cmd}'`);
      return false;
    }
    this.commands.push(cmd);
    console.log(bold.green`\tLoaded\t` + gray`${cmd.cmd}`);

    return true;
  }

  registerCommands(cmds: Command[]): boolean[] {
    return cmds.map((cmd) => this.registerCommand(cmd));
  }
}

export { Command, CommandResult, CommandHandler };
