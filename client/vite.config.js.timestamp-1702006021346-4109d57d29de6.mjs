// vite.config.js
import { defineConfig } from "file:///D:/ReactSampleProjects/Real-Estate-Market-Place/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/ReactSampleProjects/Real-Estate-Market-Place/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
