import { A, C, List, P, Section } from "../blocks";

export function WhatWentWrong() {
  return (
    <Section id="what-went-wrong" title="What went wrong for me">
      <List
        items={[
          <>My 500 GB disk was too small. The free trial wouldn’t allow more.</>,
          <>
            The node crashed once right after loading the snapshot (Snapchain issue{" "}
            <A href="https://github.com/farcasterxyz/snapchain/issues/552">#552</A>).
          </>,
          <>
            A VM restart made the snapshot download start over (
            <A href="https://github.com/farcasterxyz/snapchain/issues/1064">#1064</A>).
          </>,
          <>My read node said OK to an invalid message. That’s why castyard confirms every write.</>,
          <>
            Unfollow then follow failed, because a library reused the same timestamp. castyard now builds each message
            fresh.
          </>,
          <>
            <C>sudo reboot</C> over SSH didn’t reboot the VM. <C>gcloud compute instances reset</C> did.
          </>,
        ]}
      />
      <P>
        Full notes: <A href="https://github.com/prodabhi/castyard/blob/main/docs/LOG.md">docs/LOG.md</A>.
      </P>
    </Section>
  );
}
