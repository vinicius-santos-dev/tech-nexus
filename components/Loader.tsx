import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-142px)]">
      <Loader2 className="h-28 w-28 animate-spin text-black" />
    </div>
  );
}

export default Loader;
