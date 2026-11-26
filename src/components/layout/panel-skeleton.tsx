/** The panel's shape while a route's data streams in (the Suspense fallback of dynamic pages). */
export function PanelSkeleton() {
  return (
    <div className='flex h-full flex-col lg:p-1.5 lg:pl-0' aria-busy='true' aria-label='Loading'>
      <div className='h-full animate-pulse bg-bg-white-0 motion-reduce:animate-none lg:rounded-3xl lg:border lg:border-stroke-soft-200' />
    </div>
  );
}
