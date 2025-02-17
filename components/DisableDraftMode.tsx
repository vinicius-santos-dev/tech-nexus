"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

/**
 * DisableDraftMode Component:
 * Provides UI control for disabling Sanity draft mode preview
 * 
 * Features:
 * - Client-side draft mode toggle
 * - Environment-aware rendering
 * - Automatic router refresh after toggle
 */
export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") return null;

  const handleClick = async () => {
    await fetch("/draft-mode/disable");

    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-3 right-3 bg-gray-100 px-4 py-2 z-50"
    >
      Disable Draft Mode
    </button>
  );
}
