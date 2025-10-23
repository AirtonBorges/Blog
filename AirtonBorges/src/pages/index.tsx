import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={clsx("header hero--primary", styles.heroBanner)}>
      <section className="aside"></section>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Blog do Airton">
      <HomepageHeader />
      <div className="main">
        <div className="spline">
          <ChemLeap />
        </div>
        <div className="texto">
          <h1>Olá, eu sou o Airton!</h1>
          <span>Eu escrevo sobre coisas que eu gosto.</span>
          <br />
          <br />
          <span>
            Sou estudante de Ciência da Computação e trabalho com Angular e C#,
            mas me enfio em tudo que eu posso envolvendo novas tecnologias, ou
            projetos desafiadores.
          </span>
          <br />
          <br />
          <span>
            Se quiser ir para o blog, só clicar <Link to="/blog">aqui</Link>.
          </span>
        </div>
      </div>
    </Layout>
  );
}

export function ChemLeap(): JSX.Element {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src="/webgl/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="WebGL Scene"
      />
    </div>
  );
}
