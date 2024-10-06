import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions:  [
      "tabs",
      "scripting",
      "activeTab"
    ],
    name: "linkedin-Ai-Msg-Writer",
    description: "ai generated reply for linkedin messages! better and faster way to write and send messages!",
  },
});
