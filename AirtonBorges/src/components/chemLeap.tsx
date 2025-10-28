import { useEffect } from "react";
import { enviarMensagemUnity } from "../utils/enviarMensagemUnity";

// TODO refatorar
declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: any,
      onProgress?: (progress: number) => void
    ) => Promise<any>;
    unityInstance?: any;
    callUnity?: (gameObject: string, method: string, params?: any) => void;
  }
}

export function ChemLeap() {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("#unity-canvas");
    const warningBanner =
      document.querySelector<HTMLDivElement>("#unity-warning");
    const loadingBar =
      document.querySelector<HTMLDivElement>("#unity-loading-bar");
    const progressBarFull = document.querySelector<HTMLDivElement>(
      "#unity-progress-bar-full"
    );
    // const fullscreenButton = document.querySelector<HTMLButtonElement>(
    //   "#unity-fullscreen-button"
    // );

    if (
      !canvas ||
      !warningBanner ||
      !loadingBar ||
      !progressBarFull
    )
      return;

    function unityShowBanner(msg: string, type: string) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length
          ? "block"
          : "none";
      }

      const div = document.createElement("div");
      div.innerHTML = msg;
      warningBanner.appendChild(div);

      if (type === "error") {
        div.style.background = "red";
        div.style.padding = "10px";
      } else if (type === "warning") {
        div.style.background = "yellow";
        div.style.padding = "10px";
        setTimeout(() => {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }

      updateBannerVisibility();
    }

    const buildUrl = "webgl/Build";
    const loaderUrl = `${buildUrl}/WebBuild.loader.js`;

    const config = {
      arguments: [],
      dataUrl: `${buildUrl}/WebBuild.data`,
      frameworkUrl: `${buildUrl}/WebBuild.framework.js`,
      codeUrl: `${buildUrl}/WebBuild.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "LeapChem",
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content =
        "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
      document.head.appendChild(meta);

      document.querySelector("#unity-container")?.classList.add("unity-mobile");
      canvas.classList.add("unity-mobile");
    } else {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = async () => {
      if (!window.createUnityInstance) {
        console.error(
          "createUnityInstance not found in window after loader loaded"
        );
        return;
      }

      try {
        const unityInstance = await window.createUnityInstance(
          canvas,
          config,
          (progress: number) => {
            progressBarFull.style.width = `${100 * progress}%`;
          }
        );

        loadingBar.style.display = "none";
        window.unityInstance = unityInstance;
        enviarMensagemUnity('AlterarDescricao', "Olá! Aqui você pode criar e combinar átomos. Clique em algum dos botões, ou aperte barra de espaço!")
      } catch (e) {
        alert(e);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="unity-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        id="unity-warning"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      ></div>

      <canvas
        id="unity-canvas"
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      ></canvas>

      <div
        id="unity-loading-bar"
        style={{
          position: "absolute",
          bottom: "20px",
          width: "75%",
          maxWidth: "400px",
          height: "16px",
          background: "#ccc",
          borderRadius: "8px",
          overflow: "hidden",
          display: "none",
        }}
      >
        <div
          id="unity-progress-bar-full"
          style={{
            height: "100%",
            width: "0%",
            background: "var(--ifm-color-primary)",
            transition: "width 0.2s ease",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          width: "90%",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            top: "20px",
            right: "20px",
            display: "flex",
            gap: 4,
          }}
        >
          <button
            onClick={adicionarProton}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              height: 40,
            }}
          >
            Proton
          </button>
          <button
            onClick={adicionarNeutron}
            style={{
              background: "gray",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              height: 40,
            }}
          >
            Neuron
          </button>
          <button
            onClick={limparParticulas}
            style={{
              background: "green",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              height: 40,
            }}
          >
            Limpar
          </button>
        </div>
        {/* <button
          id="unity-fullscreen-button"
          style={{
            background: "var(--ifm-color-primary)",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ⛶
        </button> */}
      </div>
    </div>
  );

    function limparParticulas() {
        enviarMensagemUnity("LimparParticulas", 0);
    }

    function adicionarProton() {
        enviarMensagemUnity("AdicionarParticula", 0);
    }

    function adicionarNeutron() {
        enviarMensagemUnity("AdicionarParticula", 1);
    }
}
