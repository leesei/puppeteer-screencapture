#!/usr/bin/env node

// Import puppeteer
import { parseArgs } from "node:util";
import puppeteer from "puppeteer";

function usage() {
  console.log("Usage:");
  console.log("\tcli.js URL [image.png]");
}

async function screenshot(url, outfile = "./screenshot.png") {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(url);

  await page.screenshot({ path: outfile, fullPage: true });

  // Close browser.
  await browser.close();
}

const { values, positionals } = parseArgs({
  options: {
    help: {
      type: "boolean",
      short: "h",
    },
  },
  allowPositionals: true,
});

if (values.help) {
  usage();
  process.exit(0);
}
if (positionals.length < 1) {
  usage();
  process.exit(-1);
}
console.log(values, positionals);

screenshot(positionals[0], positionals[1]);
