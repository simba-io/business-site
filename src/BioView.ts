// BioView.ts
import { Application, Assets, Graphics, Sprite, Text } from "pixi.js";
import { 
  createCustomCanvas, 
  CanvasConfig, 
  ViewContentProvider,
  getResponsiveScale
} from "./CanvasUtils";

export const BIO_VIEW_ID = "bio-view-container";

class BioContentProvider implements ViewContentProvider {  async setupContent(app: Application): Promise<void> {
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

    // Create responsive profile card background
    const cardWidth = scale.cardWidth;
    const cardHeight = scale.cardHeight;
    const cardBg = new Graphics();
    cardBg.beginFill(0xD81B60, 0.9);
    cardBg.drawRoundedRect(
      app.screen.width / 2 - cardWidth / 2,
      app.screen.height / 2 - cardHeight / 2,
      cardWidth,
      cardHeight,
      20 * scale.elementScale,
    );
    cardBg.endFill();
    app.stage.addChild(cardBg);    // Add responsive bio title
    const bioTitle = new Text({
      text: "About Us",
      style: {
        fill: "#ffffff",
        fontSize: 36 * scale.textScale,
        fontFamily: "Arial",
        fontWeight: "bold"
      },
    });
    bioTitle.anchor.set(0.5);
    bioTitle.position.set(app.screen.width / 2, app.screen.height / 2 - 80 * scale.spacing);
    app.stage.addChild(bioTitle);

    // Add responsive bio content
    const bioContent = new Text({
      text: scale.isMobile 
        ? "Passionate developer\nwith web expertise.\n\nCreating innovative\nsolutions & experiences."
        : "I'm a passionate developer\nwith expertise in web technologies.\n\nI love creating innovative solutions\nand building amazing experiences.",
      style: {
        fill: "#ffffff",
        fontSize: 18 * scale.textScale,
        fontFamily: "Arial",
        align: "center",
        lineHeight: 20,
      },
    });
    bioContent.anchor.set(0.5);
    bioContent.position.set(app.screen.width / 2, app.screen.height / 2 + 20);
    app.stage.addChild(bioContent);

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

export async function createBioView(container: HTMLElement) {
  const config: CanvasConfig = {
    backgroundColor: "#c62828",
    containerId: BIO_VIEW_ID,
  };

  const contentProvider = new BioContentProvider();
  return await createCustomCanvas(container, config, contentProvider);
}