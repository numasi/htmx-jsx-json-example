import { BuildOutput } from "bun"
import { watch } from "fs"

const dir = `${import.meta.dir}/..`


async function build() {
  const b = await Bun.build({
    entrypoints: [`${dir}/templates/templates.js`],
    outdir: `${dir}/dist/`
  })
  buildLog(b)
}

function buildLog(result: BuildOutput) {
  if (!result.success) {
    console.error("Build failed");
    for (const message of result.logs) {
      console.error(message);
    }
  }
}

await build()

const watcher = watch(
  `${dir}/templates`,
  { recursive: true },
  async (event, filename) => {
    await build()
    console.log(`Detected ${event} in ${filename} (src)`)
  }
);

process.on("SIGINT", () => {
  watcher.close()
  process.exit(0)
})
