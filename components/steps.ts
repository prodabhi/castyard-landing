// Shared by the hero (client) and the footer (server), so it lives outside any "use client" file.
const pkg = "castyard@0.1.1";

export const quickstartCmd = `npx --yes ${pkg} client`;

export const quickstart = {
  requires: "Requires Node.js 20+ and a test Farcaster account with storage.",
  commands: [
    { cmd: "mkdir castyard && cd castyard", label: "Make a folder" },
    { cmd: quickstartCmd, label: "Start the client" },
  ],
  prompts: [
    { mark: "?", text: "FID", hint: "your test account’s FID" },
    { mark: "?", text: "Recovery phrase", hint: "nothing shows while you type" },
    { mark: "✓", text: "confirmed", hint: "" },
    { mark: "→", text: "open http://localhost:3000", hint: "" },
  ],
};

export const ownNode = {
  requires: "Optional. Needs Google Cloud on a paid plan; syncing takes about a day.",
  commands: [
    { cmd: `npx --yes ${pkg} provision`, label: "Provision a machine on Google Cloud" },
    { cmd: `npx --yes ${pkg} node`, label: "Start Snapchain and let it sync" },
    { cmd: `npx --yes ${pkg} client --node http://YOUR_NODE_IP:3381`, label: "Point your client at your node" },
  ],
};
