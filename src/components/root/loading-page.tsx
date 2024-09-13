import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center text-xl">
      <Loader2 className="w-8 h-8 mr-2 animate-spin text-primary" />
      Loading.
    </div>
  );
};

export default LoadingPage;
