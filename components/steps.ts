export const version = "0.1.2";
export const pkg = `castyard@${version}`;

export const quickstartCmd = `npx --yes ${pkg} client`;

export const nodeCmds = [
  `npx --yes ${pkg} provision`,
  `npx --yes ${pkg} node`,
  `npx --yes ${pkg} client --node http://YOUR_NODE_IP:3381`,
];
