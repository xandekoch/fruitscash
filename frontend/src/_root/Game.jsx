import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useAuth } from "../context/AuthProvider";
import Loader from "../components/Loader";

const Game = ({ betAmount, mode }) => {
  const { user } = useAuth();

  const { unityProvider, sendMessage, unload, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/Build/fruitscash-build.loader.js",
    dataUrl: "/Build/fruitscash-build.data",
    frameworkUrl: "/Build/fruitscash-build.framework.js",
    codeUrl: "/Build/fruitscash-build.wasm",
  });

  useEffect(() => {
    if (unityProvider) {
      sendMessage("Game Manager", "receiveBetAmount", betAmount);
      sendMessage("Game Manager", "receiveMode", mode);
      // if (user.isInfluencer) {
      //   sendMessage("Game Manager", "receiveIsInfluencer", "true");
      // }
    }
  }, [unityProvider, sendMessage]);

  window.CloseUnityInstance = (descriptionScore) => {
    console.log('CloseUnityInstance');
    setTimeout(async () => {
      await unload();
    }, 2000);
  };

  return (
    <div>
      {!isLoaded && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center"
        }}>
          <p style={{ color: "white" }}>Carregando jogo... <span style={{ color: "yellow" }}>{Math.round(loadingProgression * 100)}%</span></p>
          <p style={{ color: "white" }}>Só é carregado no primeiro jogo!</p>
          <Loader />
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        className="unity-canvas"
        style={{
          width: "100vw",
          height: "160vw",
          maxWidth: "460px",
          maxHeight: "736px",
          visibility: isLoaded ? "visible" : "hidden",
        }}
      />
    </div>
  );
}

export default Game;