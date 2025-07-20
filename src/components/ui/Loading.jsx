import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "grid" }) => {
  if (variant === "grid") {
    return (
<div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="glass rounded-xl shadow-lg overflow-hidden backdrop-blur-xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="relative h-48 skeleton overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
            </div>
            <div className="p-6 space-y-4">
              <div className="h-5 skeleton rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
              </div>
              <div className="h-4 skeleton rounded-lg w-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
              </div>
              <div className="h-7 skeleton rounded-lg w-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
<div className={cn("space-y-6", className)}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="glass rounded-xl shadow-lg p-8 backdrop-blur-xl animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 skeleton rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-5 skeleton rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
              </div>
              <div className="h-4 skeleton rounded-lg w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-enhanced" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;