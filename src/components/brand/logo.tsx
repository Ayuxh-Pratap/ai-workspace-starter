import type { SVGProps } from 'react';

/** The AI Workspace mark: a rounded square with a four-point spark cut out. Colour comes from `currentColor`. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' aria-hidden='true' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10 0h12c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H10C4.477 32 0 27.523 0 22V10C0 4.477 4.477 0 10 0Zm6 7c-.9 5.4-3.6 8.1-9 9 5.4.9 8.1 3.6 9 9 .9-5.4 3.6-8.1 9-9-5.4-.9-8.1-3.6-9-9Z'
      />
    </svg>
  );
}
