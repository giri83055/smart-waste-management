'use client';

import dynamic from 'next/dynamic';

const SimpleWasteMap3D = dynamic(() => import('./SimpleWasteMap3D'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Loading 3D Map...
    </div>
  ),
});

export default function ClientWasteMap3D() {
  return <SimpleWasteMap3D />;
} 