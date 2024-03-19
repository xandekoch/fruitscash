import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/Frutinha.loader.js",
    dataUrl: "/Build/Frutinha.data",
    frameworkUrl: "/Build/Frutinha.framework.js",
    codeUrl: "/Build/Frutinha.wasm",
  });

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("isLandscape:", isLandscape);
  }, [isLandscape]);

  const aspectRatio = 9 / 16; // Proporção desejada

  return (
    <Unity
      unityProvider={unityProvider}
      className="unity-canvas"
      style={{
        width: isLandscape ? `${100 / aspectRatio}vh` : "100%", // Largura proporcional na orientação paisagem, largura 100% na orientação retrato
        height: isLandscape ? "100%" : `${aspectRatio * 100}vw`, // Altura 100% na orientação paisagem, altura proporcional na orientação retrato
        objectFit: "contain" // Manter a proporção de 16:9
      }}
    />
  );
}

export default Game;

// devicePixelRatio={window.devicePixelRatio}