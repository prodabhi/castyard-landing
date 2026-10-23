import { C, List, P, Section, Strong, Table, Terminal } from "../blocks";

export function Operating() {
  return (
    <Section id="operating" title="Operating your node">
      <List
        items={[
          <>
            <Strong>Updates:</Strong> your node updates itself once a week. To update now, run{" "}
            <C>cd ~/snapchain && ./snapchain.sh upgrade</C> on the VM.
          </>,
          <>
            <Strong>Health:</Strong> your node is healthy when every <C>blockDelay</C> in <C>/v1/info</C> is under 10.
          </>,
          <>
            <Strong>Restarts:</Strong> Docker restarts the node after a crash or reboot, and it catches up by itself.
          </>,
          <>
            <Strong>Disk:</Strong> the data is 520 GiB and grows every day.
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
          ["3382", "Talking to other nodes", "Anyone"],
          ["3383", "gRPC API", "Anyone"],
        ]}
      />
    </Section>
  );
}
