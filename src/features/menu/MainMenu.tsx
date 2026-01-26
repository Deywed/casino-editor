import { useNavigate } from "react-router-dom";
import { Button, Card } from "pixel-retroui";
import "./MainMenu.css";

export const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-container">
      <div className="menu-background">
        <div className="menu-content">
          <Card className="p-1">
            <h2>Main Menu</h2>
          </Card>
          <Button
            className="menu-button"
            onClick={() => navigate("/create-casino")}
          >
            Create Casino
          </Button>
          <Button
            className="menu-button"
            onClick={() => navigate("/load-casino")}
          >
            Load Casino
          </Button>
        </div>
      </div>
    </div>
  );
};
