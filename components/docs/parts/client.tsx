import { C, Diagram, H3, P, Section, Strong, Terminal } from "../blocks";
import { nodeCmds } from "../../steps";

export function Client() {
  return (
    <Section id="client" title="Your client">
      <Terminal title="your laptop" lines={[{ kind: "cmd", text: nodeCmds[2] }]} />
      <P>
        The first run asks for your FID and recovery phrase. Then open <C>localhost:3000</C>.
      </P>

      <H3 id="custody">Custody address</H3>
      <P>
        Your recovery phrase controls one Ethereum address, the <Strong>custody address</Strong>. It owns your FID and
        can do anything to the account. castyard uses it once, to approve an app key.
      </P>
      <Diagram
        name="keys"
        alt="The recovery phrase controls the custody address. The custody address owns the FID. The FID approves an app key with KEY_ADD. The app key signs every cast, like and follow."
      />

      <H3 id="app-keys">App keys</H3>
      <P>
        An <Strong>app key</Strong> is a key castyard makes on your laptop. It signs your casts, likes and follows. The
        custody address approves it with a gasless <C>KEY_ADD</C> message: no transaction, no fee. The key can only
        cast, like and follow. It expires after 30 days without use. To stop using it, delete{" "}
        <C>~/.castyard/&lt;fid&gt;.key</C>.
      </P>

      <H3 id="messages">Messages</H3>
      <P>
        Every cast, like and follow is a small <Strong>message</Strong>, signed by your app key. It goes to your FID’s
        shard.
      </P>

      <H3 id="posting">Sent vs confirmed</H3>
      <Diagram
        name="life-of-a-cast"
        alt="Life of a cast: castyard signs and sends it, the read node checks the signer and gossips it, the validators put it in a block, and castyard reads it back as confirmed."
      />
      <P>
        A read node only relays your message. The validators decide if it gets in. So castyard reads every message
        back: “sent” first, then “confirmed”. My first cast confirmed in 4 seconds.
      </P>

      <H3 id="filter">Filter by app</H3>
      <Diagram
        name="client-filter"
        alt="A signer key signs each cast. signersByFid maps the key to the app that requested it. Your checkboxes show or hide casts by app."
      />
      <P>
        Each cast records the app key that signed it, and each key records the app that asked for it. castyard shows one
        checkbox per app, so you can hide casts from any app.
      </P>
    </Section>
  );
}
