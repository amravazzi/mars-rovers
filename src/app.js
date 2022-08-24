import { readFile } from "node:fs/promises";

// 1. read the telemetry file
let telemetryRaw;

try {
  telemetryRaw = await readFile("./src/telemetry.txt", "utf-8");
} catch (error) {
  console.log("There was an error reading telemetry file.");
}

// 2. normalize data structure
const telemetry = telemetryRaw.split("\n");
const [marsBoundaries, ...robotsRaw] = telemetry;

const robots = robotsRaw
  .map((el, i) => {
    // if (el && robotsRaw.length - 1 !== i) return;
    // const pos = !el ? i - 2 : robotsRaw.length - 1 === i ? i - 1 : null;
    // const [startingPosX, startingPosY, startingDir] = robotsRaw[pos].split(" ");
    // return {
    //   startingPos: [startingPosX, startingPosY],
    //   startingDir,
    //   commands: robotsRaw[pos + 1],
    // };
    if (!el) {
      const [startingPosX, startingPosY, startingDir] =
        robotsRaw[i - 2].split(" ");
      return {
        startingPos: [startingPosX, startingPosY],
        startingDir,
        commands: robotsRaw[i - 1].split(""),
      };
    }
    if (robotsRaw.length - 1 === i) {
      const [startingPosX, startingPosY, startingDir] =
        robotsRaw[i - 1].split(" ");
      return {
        startingPos: [startingPosX, startingPosY],
        startingDir,
        commands: robotsRaw[i].split(""),
      };
    }
  })
  .filter((el) => el);

//    N
// W     E
//    S

// 3. set Mars grid
class MarsGrid {
  x;
  y;
  scentedCoord;

  constructor(xBoundary, yBoundary) {
    this.x = xBoundary;
    this.y = yBoundary;
    this.scentedCoords = [];
  }

  createScentedCoord(x, y) {
    this.scentedCoords.push([x, y]);
  }

  isCoordScented(x, y) {
    return this.scentedCoords.includes([x, y]);
  }
}

// 4. set orientation

// 5. apply instructions

// 6. Output

console.log({
  robotsRaw,
  robot: robots[0],
  marsBoundaries: marsBoundaries.split(" "),
});
