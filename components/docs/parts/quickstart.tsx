import { Note, P, Section, Terminal } from "../blocks";
import { nodeCmds, quickstartCmd } from "../../steps";

const [provision, node, client] = nodeCmds;

export function Quickstart() {
  return (
    <Section id="quickstart" title="Quickstart">
      <Note kind="warn">
        <p>
          Your own node can take 24 hours to get ready. Until then, castyard uses mine.
        </p>
      </Note>
      <P>You need Node.js 20+ and a test Farcaster account. Then run one command:</P>
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
          { kind: "comment", text: "start your node on it" },
          { kind: "cmd", text: node },
          { kind: "comment", text: "once it's ready, point castyard at it" },
          { kind: "cmd", text: client },
        ]}
      />
    </Section>
  );
}
