import { Assets } from "@pixi/assets";
import type { AnimationConfig } from "../core/ObjectDefinitions";
import { Rectangle, Texture } from "pixi.js";

export const AnimationUtils = async (config: AnimationConfig) => {
  const asset = await Assets.load(config.sheetUrl);
  const base = asset.baseTexture;

  const textures = [];
  for (let i = 0; i < config.numberOfFrames; i++) {
    const frame = new Rectangle(
      i * config.frameWidth,
      0,
      config.frameWidth,
      config.frameHeight
    );
    const texture = new Texture(base, frame);
    textures.push(texture);
  }
  return textures;
};
