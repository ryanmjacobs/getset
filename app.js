#!/usr/bin/env node

const Koa = require("koa");
const app = new Koa();
app.use(require("koa-logger")());
app.use(require("koa-bodyparser")());

let state = "UNSET";
const KEY = process.env.KEY;

app.use(ctx => {
  if (KEY == null) {
    ctx.body = "error: the server KEY was not set properly";
    ctx.status = 500;
    console.log(ctx.body);
    return;
  }

  switch (ctx.request.method) {
    // Get State
    case "GET":
      ctx.body = state;
      break;

    // Set State
    case "PUT":
    case "POST":
      [ctx.body, ctx.status] = set_state(ctx.request.body);
      break;

    // Invalid HTTP Method
    default:
      ctx.body = "error: please use GET/PUT/POST requests only";
      ctx.status = 400;
      break;
  }

  console.log(ctx.body);
});

function set_state(body) {
  if (body.key !== KEY)   return ["error: incorrect key", 403];
  if (body.state == null) return ["error: please set the 'state' field", 400];

  state = body.state;
  return [state, 200];
}

app.listen(2000, () => console.log("listening on http://0.0.0.0:2000"));
