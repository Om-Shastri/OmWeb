'use client';

import { usePathname } from 'next/navigation';

export default function RouteTransition({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
