import { Note, P, Section, Terminal } from "../blocks";
import { nodeCmds, quickstartCmd } from "../../steps";

const [provision, node, client] = nodeCmds;

export function Quickstart() {
  return (
    <Section id="quickstart" title="Quickstart">
      <Note kind="warn">
        <p>
          Syncing your own node can take 24 hours. Until then, run the client on your laptop against my node.
        </p>
      </Note>
      <P>You need Node.js 20+ and a test Farcaster account with storage. One command:</P>
      <Terminal
        title="your laptop"
        lines={[
          { kind: "cmd", text: quickstartCmd },
          { kind: "comment", text: "then open localhost:3000" },
        ]}
      />
      <P>To run your own node as well, you also need the gcloud CLI:</P>
      <Terminal
        title="your laptop"
        lines={[
          { kind: "comment", text: "rent a VM on Google Cloud" },
          { kind: "cmd", text: provision },
          { kind: "comment", text: "start a Snapchain read node on it" },
          { kind: "cmd", text: node },
          { kind: "comment", text: "once it's synced, point the client at it" },
          { kind: "cmd", text: client },
        ]}
      />
    </Section>
  );
}
