import { OBJECT_CATALOG } from "../../../core/ObjectDefinitions";

type ToolboxProps = {
  selectedTool: string | null;
  setSelectedTool: (typeId: string | null) => void;
  onExpandGrid: () => void;
  onShrinkGrid: () => void;
  canShrink: boolean;
};

export const Toolbox = ({
  selectedTool,
  setSelectedTool: onSelectTool,
  onExpandGrid,
  onShrinkGrid,
  canShrink,
}: ToolboxProps) => {
  return (
    <div className="min-h-40 border-2 border-gray-300 rounded-lg p-4 bg-gray-100 min-w-40">
      <h3 className="text-gray-800 mb-2 font-bold">Alati</h3>
      <div className="flex flex-col gap-3">
        {/* Sekcija za Grid kontrole */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSelectTool(null)}
            disabled={!selectedTool}
            className={`px-3 py-1 rounded border transition-colors ${
              selectedTool
                ? "border-red-400 bg-white text-red-600! hover:bg-red-50"
                : "border-gray-200 bg-gray-50 text-gray-400! cursor-not-allowed"
            }`}
            title="Poništi selekciju"
          >
            Poništi
          </button>
        </div>

        <div className="flex align-center justify-center gap-5">
          <button
            type="button"
            onClick={onExpandGrid}
            className="px-3 py-1 rounded border border-gray-400 bg-white text-black! hover:bg-gray-200 w-10"
            title="Dodaj red i kolonu"
          >
            +
          </button>

          <button
            type="button"
            onClick={onShrinkGrid}
            disabled={!canShrink}
            className={`px-3 py-1 rounded border w-10 ${
              canShrink
                ? "border-gray-400 bg-white text-black! hover:bg-gray-200"
                : "border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="Smanji grid"
          >
            -
          </button>
        </div>

        <hr className="border-gray-300" />

        {/* Katalog objekata */}
        <div className="flex flex-col gap-2">
          {Object.values(OBJECT_CATALOG).map((tool) => {
            const isActive = selectedTool === tool.typeId;

            // Provera da li je slot machine za različite dimenzije slike
            const isSlot = tool.name === "Slot machine";

            return (
              <button
                key={tool.typeId}
                onClick={() => onSelectTool(tool.typeId)}
                className={`
                  flex items-center justify-center border-2 rounded-md p-2 transition-all
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-100 shadow-inner"
                      : "border-gray-300 bg-white hover:border-blue-300"
                  }
                `}
                title={tool.name}
              >
                <img
                  src={tool.imgSrc}
                  alt={tool.name}
                  className={`object-contain ${
                    isSlot ? "w-10 h-12" : "w-20 h-12"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
