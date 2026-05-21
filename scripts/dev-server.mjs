import { createServer } from "vite";

const port = Number(process.env.PORT || 5173);

const server = await createServer({
  clearScreen: false,
  server: {
    host: "127.0.0.1",
    port,
  },
});

await server.listen();
server.printUrls();

setInterval(() => {}, 2147483647);
