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
    return { ok: true, message: "lol", returnToSender: true } as CommandResult;
  }
}

export default HelpCommand;
