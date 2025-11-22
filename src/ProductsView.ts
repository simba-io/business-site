// ProductView.ts
import { Application, Assets, Graphics, Sprite, Text } from "pixi.js";
import { 
  createCustomCanvas, 
  CanvasConfig, 
  ViewContentProvider,
  getResponsiveScale
} from "./CanvasUtils";

export const PRODUCT_VIEW_ID = "product-view-container";

class ProductContentProvider implements ViewContentProvider {  async setupContent(app: Application): Promise<void> {
    // Get responsive scale factors
    const scale = getResponsiveScale();
    
    // Load and setup background
    const backgroundTexture = await Assets.load("/assets/background_2.png");
    const background = new Sprite(backgroundTexture);
    background.anchor.set(0.5);
    background.position.set(app.screen.width / 2, app.screen.height / 2);
    background.width = background.width * 2;
    background.height = background.height * 2;
    app.stage.addChild(background);

    // Create responsive contact form background
    const cardWidth = scale.cardWidth;
    const cardHeight = scale.cardHeight;
    const formBg = new Graphics();
    formBg.beginFill(0x1e88e5, 0.9);
    formBg.drawRoundedRect(
      app.screen.width / 2 - cardWidth / 2,
      app.screen.height / 2 - cardHeight / 2,
      cardWidth,
      cardHeight,
      20 * scale.elementScale,
    );
    formBg.endFill();
    app.stage.addChild(formBg);    // Add responsive contact title
    const contactTitle = new Text({
      text: "Products & Services",
      style: {
        fill: "#ffffff",
        fontSize: 32 * scale.textScale,
        fontFamily: "Arial",
        fontWeight: "bold",
      },
    });
    contactTitle.anchor.set(0.5);
    contactTitle.position.set(app.screen.width / 2, app.screen.height / 2 - 80 * scale.spacing);
    app.stage.addChild(contactTitle);

    // Add animated border effect
    const borderGraphics = new Graphics();
    app.stage.addChild(borderGraphics);
    
    let borderAnimation = 0;
    app.ticker.add((time) => {
      borderAnimation += 0.05 * time.deltaTime;
      
      borderGraphics.clear();
      borderGraphics.lineStyle(3, 0x81c784, 0.8);
      
      const progress = (Math.sin(borderAnimation) + 1) / 2;
      const dashLength = 20;
      const gapLength = 10;
      const totalLength = (dashLength + gapLength);
      
      // Animate dashed border around the form
      for (let i = 0; i < 20; i++) {
        const offset = (progress * totalLength + i * totalLength) % (500 + 300) * 2;
        if (offset < 500) {
          // Top edge
          borderGraphics.moveTo(app.screen.width / 2 - 250 + offset, app.screen.height / 2 - 150);
          borderGraphics.lineTo(Math.min(app.screen.width / 2 - 250 + offset + dashLength, app.screen.width / 2 + 250), app.screen.height / 2 - 150);
        }
      }
    });
  }
}

export async function createProductView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#43a047",
    containerId: PRODUCT_VIEW_ID,
  };

  const contentProvider = new ProductContentProvider();
  return await createCustomCanvas(container, config, contentProvider);
}