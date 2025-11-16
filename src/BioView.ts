// BioView.ts
import { createStandardCanvas, CanvasConfig } from "./CanvasUtils";

export const BIO_VIEW_ID = "bio-view-container";

export async function createBioView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#c62828",
    containerId: BIO_VIEW_ID,
  };

  return await createStandardCanvas(container, config);
}
