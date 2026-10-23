import { C, Diagram, H3, Note, P, Section, Terminal } from "../blocks";
import { nodeCmds } from "../../steps";

export function ReadNode() {
  return (
    <Section id="read-node" title="Your read node">
      <H3 id="snapchain">Snapchain and shards</H3>
      <P>
        Snapchain is the network that stores Farcaster. It keeps every cast, like and follow, split into three parts
        called shards. Your FID decides which shard holds your posts.
      </P>
      <Diagram
        name="shards"
        alt="Three shards. Shard 0 holds accounts, keys and storage. Shards 1 and 2 hold casts, likes and follows. Your FID picks shard 1 or 2 with sha256(fid) mod 2 plus 1. @halku lands on shard 2."
      />

      <H3 id="read-vs-validator">Read nodes vs validators</H3>
      <P>
        Validators are the servers that decide what gets added to Farcaster. A read node, like yours, keeps a full copy
        and serves it to apps. It can’t vote and earns nothing. Both run the same software.
      </P>
      <Diagram
        name="read-node-vs-validator"
        alt="The same Snapchain software runs as a validator or a read node. The validator proposes and votes on blocks. The read node downloads, verifies and serves them."
      />

      <H3 id="start-node">Start it</H3>
      <Terminal title="your laptop" lines={[{ kind: "cmd", text: nodeCmds[1] }]} />
      <P>
        This installs Snapchain on your VM. It asks for your FID, and only uses it to pick which day of the week your
        node updates itself.
      </P>

      <H3 id="sync">Sync</H3>
      <Diagram
        name="sync-timeline"
        alt="Sync timeline. Snapshot load: 9 hours, no HTTP API yet. Then catch-up per shard: shard 1 took about a day and a half. Then synced: blockDelay under 10 seconds."
      />
      <P>
        First the node downloads a copy of all the data, called a snapshot. Mine took 9 hours. Then it catches up on
        everything since. Mine took about a day and a half. To see how far behind a node is, ask it (this asks mine):
      </P>
      <Terminal
        title="your laptop"
        lines={[
          { kind: "cmd", text: "curl -s http://35.200.236.0:3381/v1/info | jq -c '.shardInfos[] | {shardId, blockDelay}'" },
          { kind: "out", text: `{"shardId":0,"blockDelay":3}\n{"shardId":1,"blockDelay":0}\n{"shardId":2,"blockDelay":2}` },
          { kind: "comment", text: "every blockDelay under 10 means it's ready" },
        ]}
      />
      <Note kind="warn">
        <p>
          Don’t restart the VM while the snapshot downloads. The download starts over from the first chunk.
        </p>
      </Note>
      <P>
        Right after the snapshot loads, the node crashes once with <C>Device or resource busy</C>. It’s a known bug,
        and the node restarts by itself.
      </P>
    </Section>
  );
}
