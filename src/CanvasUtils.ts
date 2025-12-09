// CanvasUtils.ts - Standardized canvas styling and creation utilities
import { Application } from "pixi.js";

export interface CanvasConfig {
  backgroundColor: string;
  containerId: string;
  width?: number;
  height?: number;
}

export interface ViewContentProvider {
  setupContent(app: Application): Promise<void>;
}

// Device detection utility
export function isMobileDevice(): boolean {
  // Check screen width (primary method)
  if (window.innerWidth <= 768) return true;

  // Check user agent as secondary method
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "mobile",
    "android",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
  ];

  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
}

// Get responsive scale factors
export function getResponsiveScale() {
  const isMobile = isMobileDevice();
  return {
    isMobile,
    textScale: isMobile ? 0.7 : 1,
    elementScale: isMobile ? 0.8 : 1,
    spacing: isMobile ? 0.6 : 1,
    cardWidth: isMobile ? 300 : 500,
    cardHeight: isMobile ? 200 : 300,
  };
}

export const CANVAS_STYLES = {
  width: "100%",
  height: "100%",
  marginTop: "0",
  marginBottom: "0",
} as const;

export async function createStandardCanvas(
  container: HTMLElement,
  config: CanvasConfig,
) {
  // Create a new application
  const app = new Application();

  // Initialize the application with standard settings
  await app.init({
    background: config.backgroundColor,
    resizeTo: window,
  });

  // Set the canvas size to match the container
  app.renderer.resize(container.clientWidth, container.clientHeight);
  container.appendChild(app.canvas);

  return app;
}

export async function createCustomCanvas(
  container: HTMLElement,
  config: CanvasConfig,
  contentProvider: ViewContentProvider,
) {
  // Create a new application
  const app = new Application();

  // Initialize the application with standard settings
  await app.init({
    background: config.backgroundColor,
    resizeTo: window,
  });

  // Set the canvas size to match the container
  app.renderer.resize(container.clientWidth, container.clientHeight);
  container.appendChild(app.canvas);

  // Let the view implement its own content
  await contentProvider.setupContent(app);

  return app;
}

export function createCanvasContainer(
  parentElement: HTMLElement,
  containerId: string,
): HTMLElement {
  const container = document.createElement("div");
  container.style.margin = "0";
  container.style.padding = "0";
  container.style.border = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.display = "block";
  container.style.overflow = "hidden";
  container.id = containerId;
  parentElement.appendChild(container);
  return container;
}
