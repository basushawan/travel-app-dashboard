import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    {
      name: "handle-well-known-chrome-request",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/.well-known/appspecific/")) {
            res.statusCode = 204; // No Content
            return res.end();
          }
          next();
        });
      }
    },
    tailwindcss(),
    reactRouter(),
    tsconfigPaths()
  ],
  ssr: {
    noExternal: [/@syncfusion/]
  }
});
