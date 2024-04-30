import { handleWeb } from "https://code4fukui.github.io/wsutil/handleWeb.js";
import { handleAPI } from "https://code4fukui.github.io/wsutil/handleAPI.js";
import { DateTime, TimeZone } from "https://js.sabae.cc/DateTime.js";

const port = Deno.args[0] || 8081;

const fn = "static/data/list.json";

const createOrLoad = async () => {
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
  }
  save([]);
  return [];
};
const save = async (data) => {
  await Deno.writeTextFile(fn, JSON.stringify(data, 2, null));
};

const data = await createOrLoad();

Deno.serve({
  port,
  hostname: "[::]",
  handler: async (request, info) => {
    const path = new URL(request.url).pathname;
    //console.log(request, request.headers.accept, path);
    if (path.startsWith("/api/")) {
      return handleAPI(async (param, req, path, info) => {
        if (path == "/api/upload") {
          console.log("param", param);
          for (const img of param) {
            const dt = new DateTime();
            const day = dt.toLocal(TimeZone.JST).day.toString();
            const fn = data.filter(i => i.day == day).length + ".jpg";
            data.push({ day, fn, dt: dt.toString() });
            await save(data);
            const path = "static/data/" + day + "/";
            await Deno.mkdir(path, { recursive: true });
            await Deno.writeFile(path + fn, img);
          }
        }
      }, request, path, info);
    }
    return handleWeb("static", request, path, info);
  }
});
