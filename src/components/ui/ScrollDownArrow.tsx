"use client";

export default function ScrollIndicator({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const handleScroll = () => {
    if (targetRef.current) {
      const offset = 60;
      const targetPosition = targetRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <button 
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
      aria-label="Scroll to next section"
    >
      <div className="relative flex flex-col items-center">
        {/* Text fade-in effect */}
        <span className="text-sm text-blue-400 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore More
        </span>
        
        {/* Custom animated chevron */}
        <div className="w-8 h-14 relative mt-2">
          <div className="absolute w-full h-full">
            {/* First chevron */}
            <div className="absolute top-0 left-0 w-full h-full animate-scroll-1 opacity-20">
              <div className="h-4 w-[2px] bg-blue-400 absolute left-[50%] -translate-x-1/2 rotate-45 origin-bottom" />
              <div className="h-4 w-[2px] bg-blue-400 absolute right-[50%] translate-x-1/2 -rotate-45 origin-bottom" />
            </div>
            
            {/* Second chevron */}
            <div className="absolute top-2 left-0 w-full h-full animate-scroll-2 opacity-60">
              <div className="h-4 w-[2px] bg-blue-400 absolute left-[50%] -translate-x-1/2 rotate-45 origin-bottom" />
              <div className="h-4 w-[2px] bg-blue-400 absolute right-[50%] translate-x-1/2 -rotate-45 origin-bottom" />
            </div>
            
            {/* Third chevron */}
            <div className="absolute top-4 left-0 w-full h-full animate-scroll-3">
              <div className="h-4 w-[2px] bg-blue-400 absolute left-[50%] -translate-x-1/2 rotate-45 origin-bottom" />
              <div className="h-4 w-[2px] bg-blue-400 absolute right-[50%] translate-x-1/2 -rotate-45 origin-bottom" />
            </div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </button>
  );
}