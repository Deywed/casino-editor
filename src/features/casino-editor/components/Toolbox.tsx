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
    <div className="min-h-40 border-2 border-gray-300 rounded-lg p-4 bg-gray-100">
      <h3 className="text-gray-800 mb-2">Alati</h3>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onSelectTool(null)}
          disabled={!selectedTool}
          className={`
            px-2 py-1 rounded border text-black
            ${
              selectedTool
                ? "border-gray-400 bg-gray-800 hover:bg-gray-300 text-gray-800"
                : "border-gray-200 bg-gray-800 text-gray-400 cursor-not-allowed"
            }
          `}
          title="Poništi selekciju"
          aria-label="Poništi selekciju"
        >
          X
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExpandGrid}
            className="px-2 py-1 rounded border border-gray-400 bg-white text-black hover:bg-gray-200"
            title="Dodaj 1 red i 1 kolonu"
            aria-label="Povećaj grid"
          >
            +
          </button>

          <button
            type="button"
            onClick={onShrinkGrid}
            disabled={!canShrink}
            className={`px-2 py-1 rounded border text-black ${
              canShrink
                ? "border-gray-400 bg-white hover:bg-gray-200"
                : "border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="Skini poslednji red i poslednju kolonu (objekti koji ih dodiruju će biti obrisani)"
            aria-label="Smanji grid"
          >
            -
          </button>
        </div>

        {Object.values(OBJECT_CATALOG).map((tool) => {
          const isActive = selectedTool === tool.typeId;

          return (
            <button
              key={tool.typeId}
              onClick={() => {
                onSelectTool(tool.typeId);
                console.log(tool.name);
              }}
              className={`
                border rounded p-1
                ${
                  isActive
                    ? "border-blue-500 bg-blue-100"
                    : "border-transparent"
                }
                `}
            >
              <img
                src={tool.imgSrc}
                alt={tool.name}
                className="w-full object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
