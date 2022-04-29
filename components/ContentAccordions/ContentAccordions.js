import React from 'react';
import {Accordion, AccordionTab} from 'primereact/accordion';

function ContentAccordions() {
  return (
    <div className="el-accordions">
      <Accordion activeIndex={0}>
        <AccordionTab header="Why pixl.page?">
          <p>Pixl.page let's you view your NFT collections and gives you the freedom to create pages based on a selection of your NFTs.</p>
        </AccordionTab>

        <AccordionTab header="What can I do with pixl.page?">
          <p>Show it! Put it in your twitter bio to flex your coolest NFTs! Wanna share some but not all of your NFTs? Wanna display which NFTs you are looking to sell? There is so many use cases for
            pixl.page</p>
        </AccordionTab>

        <AccordionTab header="How does it work?">
          <p>Easy! Select entire collections or individual NFTs, preview your selection, and if you're happy with it, generate a pixl.page. This page will only contain the assets you selected.</p>
        </AccordionTab>

        <AccordionTab header="What wallets are supported?">
          <p>Currently, you can look up any Cardano wallet, the integration of ETH and SOL NFTs is almost finished as well!</p>
        </AccordionTab>

        <AccordionTab header="Are ADAHandles supported?">
          <p>
            Yes, you can search wallets using the wallet adddresses or ADAHandles
          </p>
        </AccordionTab>

        <AccordionTab header="Why does it take longer to load the first time I look up a wallet?">
          <p>
            It takes time to get all the info from the blockchain but after the first time, things will be a lot faster!a
          </p>
        </AccordionTab>

        <AccordionTab header="Why do I need to connect my wallet?">
          <p>You don't have to! You can create unlimited pages without logging in. Connecting your wallet allows you to edit the pages you created!</p>
        </AccordionTab>

        <AccordionTab header="Can I edit my page once I created it?">
          <p>You don't have to! You can create unlimited pages without logging in. Connecting your wallet allows you to edit the pages you created!</p>
        </AccordionTab>

        <AccordionTab header="Why do I need to connect my wallet?">
          <p>Yes, just connect your wallet and you can edit the pages you created!</p>
        </AccordionTab>

        <AccordionTab header="Can I get a custom link? E.g. pixl.page/yourname">
          <p>Soon!</p>
        </AccordionTab>

        <AccordionTab header="What is Collector/Gallery Mode?">
          <p>In Collector mode, you can see asset names, metadata, etc. In Gallery mode, the focus is on the visual art only</p>
        </AccordionTab>

        <AccordionTab header="Where can I see the Metadata of an NFT?">
          <p>Press the "M" button next to the asset name to flip the card to the Metadata view. If you want to see the Metadata in a larger sidebar, press the ARROW button</p>
        </AccordionTab>

        <AccordionTab header="Can someone see all the NFTs from my wallet?">
          <p>Only if someone has your wallet address. If you generate a pixl.page with a selection of your NFTs, there is no way on pixl.page to see all your NFTs.</p>
        </AccordionTab>

        <AccordionTab header="(Mobile View) How can I select collections/assets?">
          <p>Tab the collection/asset name to display the select button</p>
        </AccordionTab>

        <AccordionTab header="(Mobile View) Where is the Metadata?">
          <p>Tab the collection/asset name to display the Metadata button</p>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default ContentAccordions;