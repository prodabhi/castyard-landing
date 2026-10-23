import { A, C, P, Section, Table, Terminal } from "../blocks";

export function Troubleshooting() {
  return (
    <Section id="troubleshooting" title="Troubleshooting">
      <Table
        head={["You see", "Do this"]}
        rows={[
          [<C key="m">{"can't reach the node"}</C>, "Your node is still loading. Use mine meanwhile."],
          [<C key="m">{"doesn't own fid"}</C>, "Wrong recovery phrase or FID."],
          [<C key="m">Not included after 3 attempts</C>, <>Check <C>blockDelay</C>, or switch to my node.</>],
          ["Quota error on provision", <>Upgrade from the free trial. See <A href="/docs/provision#free-trial">Provision</A>.</>],
        ]}
      />
    </Section>
  );
}

export function CleanUp() {
  return (
    <Section id="clean-up" title="Clean up">
      <Terminal
        title="your laptop"
        lines={[
          { kind: "comment", text: "delete the VM, its disk and its IP" },
          { kind: "cmd", text: "npx --yes castyard@0.1.1 ctl destroy" },
          { kind: "comment", text: "delete castyard's app key" },
          { kind: "cmd", text: "rm ~/.castyard/YOUR_FID.key" },
        ]}
      />
      <P>
        Source: <A href="https://github.com/prodabhi/castyard">github.com/prodabhi/castyard</A>.
      </P>
    </Section>
  );
}
