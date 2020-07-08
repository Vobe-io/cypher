import * as fs from "fs";

interface Config {
  commandPrefix: string;
}

function loadConfig(file?: string): Config {
  return JSON.parse(
    fs.readFileSync(file ?? "config.json").toString()
  ) as Config;
}

export { loadConfig, Config };
