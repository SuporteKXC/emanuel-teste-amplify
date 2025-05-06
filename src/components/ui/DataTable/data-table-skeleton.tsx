import React from "react";
import { Skeleton as SkeletonUI } from "@/components/ui/skeleton";

export const Skeleton: React.FC = () => {
  const renderTableSkeleton = () => {
    const rows = [];
    for (let i = 0; i < 20; i++) {
      rows.push(<SkeletonUI key={i} className="flex flex-1 h-[50px]" />);
    }
    return rows;
  };
  return (
    <section>
      <div className="w-full mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <SkeletonUI className="h-10 w-full" />
        <div className="hidden lg:flex justify-end w-full gap-3">
          <SkeletonUI className="w-[103px] h-[32px]" />
          <SkeletonUI className="w-[103px] h-[32px]" />
        </div>
      </div>
      <div className="grid gap-1">{renderTableSkeleton()}</div>
    </section>
  );
};
