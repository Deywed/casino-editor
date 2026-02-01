// src/components/pixi/CasinoObjectRenderer.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Sprite, AnimatedSprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import { CELL_SIZE } from "../../../utils/Constants"; // Prilagodi putanju
import { rotateObject } from "../../../utils/GridUtils"; // Prilagodi putanju
import type {
  CasinoObjectDef,
  CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { getFramesFromSpriteSheet } from "../../../utils/AnimationUtils";

interface Props {
  instance: CasinoObjectInstance;
  def: CasinoObjectDef;
}

export const CasinoObject: React.FC<Props> = ({ instance, def }) => {
  // 1. Logika za pozicioniranje (preuzeta iz tvog starog InstancesLayer-a)
  // Moramo izračunati centar rotiranog footprinta da bi se sprite vrteo oko centra grid-a
  const geometry = useMemo(() => {
    const fp = rotateObject(def.footprint, instance.rotation);
    const boundingWidth = fp[0].length * CELL_SIZE;
    const boundingHeight = fp.length * CELL_SIZE;

    return {
      x: instance.originX * CELL_SIZE + boundingWidth / 2,
      y: instance.originY * CELL_SIZE + boundingHeight / 2,
      // Za sam sprite koristimo originalne dimenzije (nepromenjene rotacijom grida)
      // Pixi "angle" će odraditi vizuelnu rotaciju
      width: def.width * CELL_SIZE,
      height: def.height * CELL_SIZE,
    };
  }, [instance, def]);

  // --- LOGIKA ZA ANIMACIJU ---
  const [frames, setFrames] = useState<PIXI.Texture[]>([]);

  useEffect(() => {
    // Ako nema animacije, ne radi ništa
    if (!def.animation) return;

    const texture = PIXI.Texture.from(def.animation.sheetUrl);

    const prepare = () => {
      const sliced = getFramesFromSpriteSheet(
        texture,
        def.animation!.frameWidth,
        def.animation!.frameHeight
      );
      setFrames(sliced);
    };

    if (texture.baseTexture.valid) {
      prepare();
    } else {
      texture.baseTexture.once("loaded", prepare);
    }
  }, [def.animation]);

  // Ako postoji definicija animacije i frejmovi su isečeni -> ANIMATED SPRITE
  if (def.animation && frames.length > 0) {
    // Ovde biramo koje frejmove puštamo (npr. IDLE sekvencu)
    const sequence = def.animation.sequences["idle"] || {
      frames: [0],
      speed: 0.1,
    };
    const activeTextures = sequence.frames
      .map((i) => frames[i])
      .filter(Boolean);

    if (activeTextures.length === 0) return null;

    return (
      <AnimatedSprite
        textures={activeTextures}
        isPlaying={true}
        animationSpeed={sequence.speed || 0.1}
        loop={sequence.loop ?? true}
        anchor={0.5}
        x={geometry.x}
        y={geometry.y}
        width={geometry.width}
        height={geometry.height}
        angle={instance.rotation}
      />
    );
  }

  // Fallback -> STATIC SPRITE (tvoj stari kod)
  return (
    <Sprite
      image={def.imgSrc}
      anchor={0.5}
      x={geometry.x}
      y={geometry.y}
      width={geometry.width}
      height={geometry.height}
      angle={instance.rotation}
    />
  );
};
