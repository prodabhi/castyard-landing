import { C, List, P, Section, Strong, Table, Terminal } from "../blocks";

export function Operating() {
  return (
    <Section id="operating" title="Operating your node">
      <List
        items={[
          <>
            <Strong>Upgrades:</Strong> the installer adds a weekly cron job. To upgrade now, run{" "}
            <C>cd ~/snapchain && ./snapchain.sh upgrade</C> on the VM.
          </>,
          <>
            <Strong>Health:</Strong> <C>blockDelay</C> under 10 on every shard, from <C>/v1/info</C>.
          </>,
          <>
            <Strong>Restarts:</Strong> Docker restarts the node after a crash or reboot, and it catches up by itself.
          </>,
          <>
            <Strong>Disk:</Strong> the database is 520 GiB and grows daily.
          </>,
        ]}
      />
      <Terminal
        title="your laptop"
        lines={[
          { kind: "comment", text: "status, logs, a shell on the VM" },
          { kind: "cmd", text: "npx --yes castyard@0.1.1 ctl status" },
          { kind: "cmd", text: "npx --yes castyard@0.1.1 ctl logs" },
          { kind: "cmd", text: "npx --yes castyard@0.1.1 ctl ssh" },
          { kind: "comment", text: "stop billing for the machine (the disk still bills)" },
          { kind: "cmd", text: "npx --yes castyard@0.1.1 ctl stop" },
        ]}
      />
      <P>
        The log line <C>InsufficientPeers (&quot;read-node-peers&quot;)</C> is normal. It means no other read node is
        connected.
      </P>
      <Table
        head={["Port", "What", "Open to"]}
        rows={[
          ["3381", "HTTP API", "Anyone"],
          ["3382", "Gossip with other nodes", "Anyone"],
          ["3383", "gRPC API", "Anyone"],
        ]}
      />
    </Section>
  );
}
