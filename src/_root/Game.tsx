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
    const handleOrientationChange = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <Unity
      unityProvider={unityProvider}
      className="unity-canvas"
      style={{
        height: isLandscape ? "100%" : "auto", // Altura 100% na orientação paisagem
        width: isLandscape ? "auto" : "100%", // Largura 100% na orientação retrato
        objectFit: "contain" // Manter a proporção de 16:9
      }}
    />
  );
}

export default Game;

// devicePixelRatio={window.devicePixelRatio}