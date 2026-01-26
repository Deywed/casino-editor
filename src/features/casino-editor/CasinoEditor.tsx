import React from "react";
import { useParams } from "react-router-dom";
import "./CasinoEditor.css";

export const CasinoEditor = () => {
  const { casinoId } = useParams<{ casinoId: string }>();
  return (
    <div className="casino-editor-container">
      <div className="casino-editor-background">
        <div className="casino-editor-content">
          <h1>{casinoId}</h1>
        </div>
      </div>
    </div>
  );
};
