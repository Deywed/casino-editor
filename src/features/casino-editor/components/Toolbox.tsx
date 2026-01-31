import { OBJECT_CATALOG } from "../../../core/ObjectDefinitions";

type ToolboxProps = {
  selectedTool: string | null;
  setSelectedTool: (typeId: string) => void;
};

export const Toolbox = ({
  selectedTool,
  setSelectedTool: onSelectTool,
}: ToolboxProps) => {
  return (
    <div className="min-h-40 border-2 border-gray-300 rounded-lg p-4 bg-gray-100">
      <h3 className="text-gray-800 mb-2">Alati</h3>
      <div className="flex flex-col gap-3">
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
