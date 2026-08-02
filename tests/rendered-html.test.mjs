import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const routes = ["", "products", "service", "insights", "about", "job", "contact"];

async function readRoute(route) {
  const path = route ? `${route}/index.html` : "index.html";
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports every public NAVTEAM route with the shared site shell", async () => {
  const pages = await Promise.all(routes.map(readRoute));

  for (const [index, html] of pages.entries()) {
    assert.match(html, /<header class="site-header">/);
    assert.match(html, /<footer class="site-footer">/);
    assert.match(html, /Professional Marine Electronics/);
    assert.match(html, /href="[^"]*\/products\/"/);
    assert.match(html, /href="[^"]*\/service\/"/);
    assert.match(html, /href="[^"]*\/job\/"/);
    assert.doesNotMatch(html, /href="[^"]*\/careers\//);
    assert.doesNotMatch(html, /navteam@navteam\.com/i);
    assert.doesNotMatch(html, /Concept website · English first/i);
    assert.ok(html.length > 1_000, `route ${routes[index] || "/"} is unexpectedly small`);
  }
});

test("uses the shared subpage introduction on every standard subpage", async () => {
  const expectedHeadings = new Map([
    ["products", "Products"],
    ["service", "Service &amp; Support"],
    ["insights", "Insights"],
    ["about", "About NAVTEAM"],
    ["job", "Job"],
    ["contact", "Contact"],
  ]);

  for (const [route, heading] of expectedHeadings) {
    const html = await readRoute(route);
    assert.match(html, /<section class="[^"]*page-intro[^"]*">/);
    assert.match(html, new RegExp(`<h1[^>]*>${heading}<\\/h1>`));
  }

  const products = await readRoute("products");
  assert.match(products, /<section class="page-intro"><h1>Products<\/h1>/);
});
