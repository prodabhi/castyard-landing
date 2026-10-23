import { C, H3, List, P, Section, Table, Terminal } from "../blocks";
import { nodeCmds } from "../../steps";

export function Provision() {
  return (
    <Section id="provision" title="Provision">
      <Terminal
        title="your laptop"
        lines={[
          { kind: "cmd", text: "gcloud auth login" },
          { kind: "cmd", text: "gcloud config set project YOUR_PROJECT_ID" },
          { kind: "cmd", text: nodeCmds[0] },
        ]}
      />
      <P>
        This creates a VM in Mumbai and opens ports 3381 to 3383 for Snapchain. Change the defaults with env vars, like{" "}
        <C>MACHINE=</C> or <C>DISK_GB=</C>.
      </P>
      <Table
        head={["What", "My node", "Per day"]}
        rows={[
          ["Machine", "e2-standard-4: 4 vCPU, 16 GB", "$3.86"],
          ["Disk", "2,000 GB SSD", "$7.89"],
          ["Static IP", "35.200.236.0", "$0.12"],
        ]}
      />

      <H3 id="free-trial">The free trial is too small</H3>
      <P>
        Google’s free trial caps SSD at 500 GB. The snapshot alone is about 506 GB. To fix it:
      </P>
      <List
        items={[
          <>Upgrade billing to paid. The free credit carries over.</>,
          <>
            Request 2048 GB of <C>SSD-TOTAL-GB-per-project-region</C> quota. Mine was approved in about 50 seconds.
          </>,
        ]}
      />
    </Section>
  );
}
