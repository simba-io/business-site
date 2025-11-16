// ContactView.ts
import { createStandardCanvas, CanvasConfig } from "./CanvasUtils";

export const CONTACT_VIEW_ID = "contact-view-container";

export async function createContactView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#43a047",
    containerId: CONTACT_VIEW_ID,
  };

  return await createStandardCanvas(container, config);
}
