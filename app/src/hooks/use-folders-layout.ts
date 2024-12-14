import { useState, useEffect } from "react";

export type LayoutType = "grid" | "list";

export function useFoldersLayout() {
  const LOCAL_STORAGE_KEY = "folders-layout";
  const [layout, setLayout] = useState<LayoutType>("grid");

  useEffect(() => {
    const storedLayout = localStorage.getItem(LOCAL_STORAGE_KEY) as LayoutType | null;

    if (storedLayout === "grid" || storedLayout === "list") {
      setLayout(storedLayout);
    } else {
      // If the key does not exist or is not valid : set it
      localStorage.setItem(LOCAL_STORAGE_KEY, "grid");
      setLayout("grid");
    }
  }, []);

  const updateLayout = (newLayout: LayoutType) => {
    if (newLayout !== "grid" && newLayout !== "list") {
      throw new Error("Invalid layout type. Must be 'grid' or 'list'.");
    }
    setLayout(newLayout);
    localStorage.setItem(LOCAL_STORAGE_KEY, newLayout);
  };

  return { 
    folderLayout: layout, 
    setFolderLayout: updateLayout 
  };
}
