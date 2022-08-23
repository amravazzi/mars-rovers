import { readFile } from "node:fs/promises";

try {
  const telemetryRaw = await readFile("./src/telemetry.txt", "utf-8");
  const telemetry = telemetryRaw.split("\n");
  console.log(telemetry);
} catch (error) {
  console.log("There was an error reading telemetry file.");
}
