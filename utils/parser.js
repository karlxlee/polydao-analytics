import { parse } from "node-html-parser";

export default async function parser(html) {
  const text = await html.text();
  var doc = parse(text);
  const json = JSON.parse(doc.querySelector("#__next").textContent);
  return json;
}
