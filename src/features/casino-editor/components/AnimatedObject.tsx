import React, { useEffect, useState } from "react";
import type { CasinoObjectDef } from "../../../core/ObjectDefinitions";
import type { Texture } from "pixi.js";
import { AnimationUtils } from "../../../utils/AnimationUtils";
import { AnimatedSprite, Sprite } from "@pixi/react";

interface Props {
  def: CasinoObjectDef;
  x: number;
  y: number;
  rotation?: number;
  width: number;
  height: number;
}

export const AnimatedObject = ({
  def,
  x,
  y,
  rotation,
  width,
  height,
}: Props) => {
  const [textures, setTextures] = useState<Texture[] | null>(null);

  useEffect(() => {
    if (def.animation) {
      AnimationUtils(def.animation).then(setTextures);
    }
  }, [def.typeId]);

  if (!def.animation || !textures) {
    return (
      <Sprite
        image={def.imgSrc}
        anchor={0.5}
        x={x}
        y={y}
        width={width}
        height={height}
        angle={rotation}
      />
    );
  }

  return (
    <AnimatedSprite
      textures={textures}
      anchor={0.5}
      x={x}
      y={y}
      width={width}
      height={height}
      angle={rotation}
      animationSpeed={0.15} // Brzina animacije
      isPlaying={true}
      loop={true}
    />
  );
};
