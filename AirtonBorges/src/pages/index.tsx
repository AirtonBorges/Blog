import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Spline from "@splinetool/react-spline";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { Suspense } from "react";

import styles from "./index.module.css";
import Link from '@docusaurus/Link';

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
          <CustomSpline />
        </div>
        <div className="texto">
          <h1>Olá, eu sou o Airton!</h1>
          <span>Eu escrevo sobre coisas que eu gosto.</span>
          <br />
          <br />
          <span>Sou estudante de Ciência da Computação e trabalho com Angular e C#, mas me enfio em tudo que eu posso envolvendo novas tecnologias, ou projetos desafiadores.</span>
          <br />
          <br />
          <span>Se quiser ir para o blog, só clicar <Link to="/blog">aqui</Link>.</span>
        </div>
      </div>
    </Layout>
  );
}

export function CustomSpline(): JSX.Element {
  return (
    <Suspense fallback={<img>Loading...</img>}>
      <Spline scene="https://prod.spline.design/NRzroyFKIV9uqcXK/scene.splinecode" />
    </Suspense>
  );
}
