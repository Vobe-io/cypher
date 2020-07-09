import { CommandHandler } from "~/bot";
import { Command, CommandResult } from "~/commands";
import { Message } from "discord.js";

class HelpCommand extends Command {
  constructor() {
    super();
    this.cmd = "help";
    this.help = "<$prefix><$command>";
    this.enabled = true;
  }

  run(msg: Message): CommandResult {
    let message: string = CommandHandler.commands
      .filter((cmd) => cmd.enabled)
      .map((cmd) => ({
        cmd: cmd.cmd,
        parsedHelp: cmd.help
          .replace("<$prefix>", CommandHandler.prefix)
          .replace("<$command>", cmd.cmd),
      }))
      .map((r) => `${r.cmd}\t\`${r.parsedHelp}\``)
      .join("\n");
    return { ok: false, message, returnToSender: true } as CommandResult;
  }
}

export default HelpCommand;
