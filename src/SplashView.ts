// SplashView.ts
import { Application, Assets, Graphics, Sprite, Text } from "pixi.js";
import { 
  createCustomCanvas, 
  CanvasConfig, 
  ViewContentProvider 
} from "./CanvasUtils";

export const SPLASH_VIEW_ID = "splash-view-container";

class SplashContentProvider implements ViewContentProvider {
  async setupContent(app: Application): Promise<void> {
    // Load the background and bunny textures
    const backgroundTexture = await Assets.load("/assets/background_1.png");
    const background = new Sprite(backgroundTexture);

    background.anchor.set(0.5); // Center the anchor point
    background.position.set(app.screen.width / 2, app.screen.height / 2); // Position at screen center
    background.width = background.width * 2; // Scale to fit screen width
    background.height = background.height * 2; // Scale to fit screen height
    app.stage.addChild(background);

    const card = new Graphics();
    card.beginFill(0xFFA500, 0.9);
    card.drawRoundedRect(
      app.screen.width / 2 - 250,
      app.screen.height / 2 - 150,
      500,
      100,
      20,
    );
    card.endFill();
    app.stage.addChild(card);
    
    // Add a welcome text
    const welcomeText = new Text({
      text: "We Make Websites!",
      style: {
        fill: "#ffffff",
        fontSize: 48,
        fontFamily: "Arial",
        fontWeight: "bold",
      },
    });
    welcomeText.anchor.set(0.5);
    welcomeText.position.set(app.screen.width / 2, app.screen.height / 2 - 100);
    app.stage.addChild(welcomeText);

    let textScale = 1;
    let scaleDirection = 1;
    app.ticker.add((time) => {
      textScale += 0.01 * scaleDirection * (time.deltaTime * 0.05);
      if (textScale > 1.05) scaleDirection = -1;
      if (textScale < 0.95) scaleDirection = 1;
      welcomeText.scale.set(textScale);
      card.scale.set(textScale);
    });
  }
}

export async function createSplashView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#1099bb",
    containerId: SPLASH_VIEW_ID
  };

  const contentProvider = new SplashContentProvider();
  return await createCustomCanvas(container, config, contentProvider);
}
