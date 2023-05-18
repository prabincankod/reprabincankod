import { Inter } from "next/font/google";
import Image from "next/image";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "react-notion/src/styles.css";
const inter = Inter({ subsets: ["latin"] });

import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import { NotionRenderer } from "react-notion";
import { NotionRenderer as Xrend } from "react-notion-x";

const notion = new NotionAPI();

export const getStaticProps = async () => {
  const recordMap: ExtendedRecordMap = await notion.getPage(
    "de39f2b7a76740de9dc90fa36f7e98d6"
  );

  const iconmap: ExtendedRecordMap = await notion.getPage(
    "39aae5743d344fab9bfaae223b57e4a3"
  );

  return {
    props: {
      iconmap,
      recordMap,
    },

    // fallback: "blocking",
    revalidate: 10,
  };
};
// @ts-ignore
export default function Home({
  recordMap,
  iconmap,
}: {
  recordMap: ExtendedRecordMap;
  iconmap: ExtendedRecordMap;
}) {
  const map = iconmap.block;
  return (
    <>
      <header className="header p-[8px]">
        <div className="header__title">
          <h2>
            <code>prabincankod</code>
          </h2>
        </div>
      </header>
      {/* @ts-ignore */}
      <NotionRenderer blockMap={map} hideHeader={true} fullPage={true} />
      <Xrend
        recordMap={recordMap}
        fullPage={false}
        disableHeader={true}
        darkMode={false}
      />
    </>
  );
}
