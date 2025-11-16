// SplashView.ts
import { createStandardCanvas, CanvasConfig } from "./CanvasUtils";

export const SPLASH_VIEW_ID = "splash-view-container";

export async function createSplashView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#1099bb",
    containerId: SPLASH_VIEW_ID,
  };

  return await createStandardCanvas(container, config);
}
