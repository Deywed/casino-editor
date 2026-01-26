import React, { useState } from "react";
import { Input, Button } from "pixel-retroui";
import "./CreateCasino.css";
import { useNavigate } from "react-router-dom";

export const CreateCasino = () => {
  const [casinoName, setCasinoName] = useState<string>("");

  const navigate = useNavigate();
  return (
    <div className="create-casino-container">
      <div className="create-casino-background" />
      <div className="create-casino-content">
        <h2>Name Of Casino</h2>
        <Input
          placeholder="Enter text..."
          onChange={(e) => setCasinoName(e.target.value)}
        />
        <Button
          className="create-casino-button"
          onClick={() => {
            const encodedCasinoName = encodeURIComponent(casinoName);
            navigate(`/editor/${encodedCasinoName}`);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
