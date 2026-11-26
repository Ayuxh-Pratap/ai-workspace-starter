import { LogoMark } from '@/components/brand/logo';
import { cn } from '@/utils/cn';

// Logos the settings pages show. Browser and app icons are a neutral placeholder of the same size; drop real logo
// images in when you have them.

/** The workspace's mark. */
export function WorkspaceLogo({ className }: { className?: string }) {
  return <LogoMark className={className} />;
}

/** Stands in for a third-party logo image (a browser, a connected app): same box, no artwork. */
export function LogoPlaceholder({ label, className }: { label: string; className?: string }) {
  return <span role='img' aria-label={label} className={cn('block shrink-0 rounded-full bg-bg-soft-200', className)} />;
}
