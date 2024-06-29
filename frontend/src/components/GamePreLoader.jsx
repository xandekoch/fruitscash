import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const GamePreLoader = () => {
    const { unityProvider, isLoaded, unload } = useUnityContext();

    useEffect(() => {
        const unloadGame = async () => {
            if (unityProvider && isLoaded) {
                await unload();
                console.log("Unloaded successfully.");
            }
        };

        unloadGame();
    }, [unityProvider, isLoaded, unload]);

    return (
        <div style={{background: "#1f2024"}}>
            <Unity
                unityProvider={unityProvider}
                className="unity-canvas"
                style={{ visibility: "hidden", height: 0, overflow: "hidden" }}
            />
        </div>
    );
};

export default GamePreLoader;