

export function ThreeDText({ text,textSize}: { text: string, textSize: string }) {
return (
    <h1
      className={`
        ${textSize}
        relative 
      `} //Take in a className prop for text size, relative positioning
    >
      {/* Back Layer*/}
      <span
        aria-hidden
        className="
          absolute inset-0
          translate-x-[0.06em] translate-y-[0.06em]
          md:translate-x-[0.04em] md:translate-y-[0.04em]
          
          opacity-30
          blur-[0.5px]
        " //absolute so its free, inset-0 to cover entire h1, slight offset, low opacity and blur for depth
      >
        {text}
      </span>

      {/* Front layer */}
      <span className="relative z-10"> {/*Stack above back layer*/}
        {text}
      </span>
    </h1>
  );
}