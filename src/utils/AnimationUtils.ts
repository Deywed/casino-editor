// src/utils/PixiUtils.ts
import * as PIXI from "pixi.js";

export const getFramesFromSpriteSheet = (
  texture: PIXI.Texture,
  frameWidth: number,
  frameHeight: number
): PIXI.Texture[] => {
  const frames: PIXI.Texture[] = [];

  if (!texture.baseTexture) return [];

  const baseWidth = texture.baseTexture.width;
  const baseHeight = texture.baseTexture.height;

  const columns = Math.floor(baseWidth / frameWidth);
  const rows = Math.floor(baseHeight / frameHeight);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const rect = new PIXI.Rectangle(
        x * frameWidth,
        y * frameHeight,
        frameWidth,
        frameHeight
      );
      frames.push(new PIXI.Texture(texture.baseTexture, rect));
    }
  }
  return frames;
};
