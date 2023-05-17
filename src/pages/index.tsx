import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { NotionAPI } from "notion-client";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import { NotionRenderer } from "react-notion";

const notion = new NotionAPI();

export const getStaticProps = async () => {
  const recordMap = await notion.getPage("de39f2b7a76740de9dc90fa36f7e98d6");

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};
// @ts-ignore
export default function Home({ recordMap }) {
  return (
    <>
      <header className="header p-[8px]">
        <div className="header__title">
          <h2>
            <code>prabincankod</code>
          </h2>
        </div>
      </header>
      <NotionRenderer
        blockMap={recordMap.block}
        fullPage={true}
        hideHeader={true}
        level={0}
      />
    </>
  );
}
