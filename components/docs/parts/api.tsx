import { C, P, Section, Table, Terminal } from "../blocks";

export function ApiReference() {
  return (
    <Section id="api" title="API">
      <P>castyard only talks to the node’s HTTP API on port 3381:</P>
      <Table
        head={["Endpoint", "Used for"]}
        rows={[
          [<C key="e">GET /v1/info</C>, "Node version, and how far behind each shard is"],
          [<C key="e">GET /v1/castsByFid</C>, "An account’s casts"],
          [<C key="e">GET /v1/linksByFid</C>, "Who an account follows"],
          [<C key="e">GET /v1/reactionsByFid</C>, "An account’s likes and recasts"],
          [<C key="e">GET /v1/signersByFid</C>, "An account’s app keys, and the app behind each"],
          [<C key="e">POST /v1/submitMessage</C>, "Send a signed message"],
        ]}
      />
      <P>Try one against my node:</P>
      <Terminal
        title="your laptop"
        lines={[
          {
            kind: "cmd",
            text: `curl -s "http://35.200.236.0:3381/v1/castsByFid?fid=3356451&pageSize=1&reverse=true" | jq -c '.messages[].data.castAddBody.text'`,
          },
          { kind: "out", text: `"this is my demo's cast at 7:49 pm"` },
        ]}
      />
    </Section>
  );
}
