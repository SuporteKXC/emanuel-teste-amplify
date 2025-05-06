import React from 'react';
import { Skeleton as SkeletonUI } from '@/components/ui/skeleton';

export const Skeleton: React.FC = () => {
  return (
    <section>
      <div className="flex justify-end">
        <SkeletonUI className="w-[90px] h-[40px] mb-2" />
      </div>
      <SkeletonUI className="w-full h-[72px] mb-4" />
      <SkeletonUI className="w-full h-[504px] mb-4" />
      <SkeletonUI className="w-full h-[260px] mb-4" />
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <SkeletonUI className="flex flex-1 h-[258px]" />
        <SkeletonUI className="flex flex-1 h-[258px]" />
        <SkeletonUI className="flex flex-1 h-[258px]" />
      </div>

    </section>
  );
};
