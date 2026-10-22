import type { Metadata } from "next";
import { H2, Note, P, Stats, Terminal, Title, icons } from "@/components/docs/blocks";
import { nodeCmds } from "@/components/steps";

export const metadata: Metadata = {
  title: "Run your own node · Castyard docs",
  description: "Run your own Snapchain read node on Google Cloud and point castyard at it.",
};

const [provision, node, client] = nodeCmds;

export default function RunYourOwnNode() {
  return (
    <>
      <Title lead="Optional. Run your own Snapchain node on Google Cloud, then point castyard at it. Reads come from your own copy of Farcaster.">
        Run your own node
      </Title>

      <Terminal
        lines={[
          { kind: "comment", text: "create the VM, open ports 3381–3383, install Docker" },
          { kind: "cmd", text: provision },
          { kind: "comment", text: "start the node in the background and show progress" },
          { kind: "cmd", text: node },
          { kind: "comment", text: "point castyard at your node" },
          { kind: "cmd", text: client },
        ]}
      />

      <H2>What it needs</H2>
      <Stats
        items={[
          { value: "4 vCPU", label: "CPU" },
          { value: "16 GB", label: "Memory" },
          { value: "1 TB", label: "Disk" },
          { value: "~$8/day", label: "Google Cloud" },
        ]}
      />
      <Note icon={icons.info}>
        The Google Cloud free trial caps SSD at 500 GB. Upgrade to a paid account first. Your $300 credit stays.
      </Note>

      <H2>Waiting for it to sync</H2>
      <P>
        It takes about a day. First it loads a snapshot (mine took 9 hours), then it catches up. Check how far behind it
        is:
      </P>
      <Terminal
        title="your node"
        lines={[
          { kind: "cmd", text: `curl -s localhost:3381/v1/info | jq '.shardInfos[] | {shardId, blockDelay}'` },
          { kind: "comment", text: "single digits on every shard means it’s synced" },
        ]}
      />
      <P>Delete the VM when you’re done. It bills every day it exists.</P>
    </>
  );
}
