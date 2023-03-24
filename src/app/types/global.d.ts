declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.css' {
  const classes: Record<string, string>;
  export = classes;
}

// declare module '*.svg' {
//   const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   export default ReactComponent;
// }

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

declare module '*.png' {
  const content: StaticImageData;

  export default content;
}

declare module '*.jpg' {
  const content: StaticImageData;

  export default content;
}

declare module '*.jpeg' {
  const content: StaticImageData;

  export default content;
}

declare module '*.gif' {
  const content: StaticImageData;

  export default content;
}

declare module '*.webp' {
  const content: StaticImageData;

  export default content;
}

declare module '*.avif' {
  const content: StaticImageData;

  export default content;
}

declare module '*.ico' {
  const content: StaticImageData;

  export default content;
}

declare module '*.bmp' {
  const content: StaticImageData;

  export default content;
}

declare const _IS_DEV_: boolean;
