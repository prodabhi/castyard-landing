import { A, C, H3, List, P, Section, Strong, Terminal } from "../blocks";

export function BeforeYouStart() {
  return (
    <Section id="before-you-start" title="Before you start">
      <H3 id="fids">FIDs</H3>
      <P>
        Every Farcaster account is a number, its <Strong>FID</Strong>. Your username, casts and follows are all linked to it. My
        test account is @halku, FID 3356451.
      </P>

      <H3 id="storage">Storage rent</H3>
      <P>
        Farcaster only keeps your posts if your account pays for storage. One unit lasts a year. My account, made in
        the Farcaster app, came with one. Check yours with your own FID:
      </P>
      <Terminal
        title="your laptop"
        lines={[
          {
            kind: "cmd",
            text: `curl -s "http://35.200.236.0:3381/v1/storageLimitsByFid?fid=3356451" | jq -c '.limits[] | {name, limit, used}'`,
          },
          { kind: "out", text: `{"name":"CASTS","limit":300,"used":2}\n{"name":"LINKS","limit":600,"used":2}\n{"name":"REACTIONS","limit":600,"used":2}` },
        ]}
      />

      <H3 id="recovery-phrase">Treat your recovery phrase like rm -rf /</H3>
      <List
        items={[
          <>Use a test account. Never your main one.</>,
          <>Only type a recovery phrase into software whose code you’ve read.</>,
          <>
            castyard asks for the phrase once, at a hidden prompt, uses it to approve itself, and forgets it.
            It never sends or saves it. The code is one file:{" "}
            <A href="https://github.com/prodabhi/castyard/blob/main/src/add-key.js">src/add-key.js</A>.
          </>,
          <>
            It saves only its own key, in <C>~/.castyard/&lt;fid&gt;.key</C>.
          </>,
        ]}
      />
    </Section>
  );
}
