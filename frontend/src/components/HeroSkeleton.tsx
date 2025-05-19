import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HeroSkeleton: React.FC = () => (
  <Card className="bg-background relative h-full w-full max-w-2xl min-w-xs">
    <CardHeader className="flex flex-col items-center justify-start gap-5 min-[420px]:flex-row">
      <Skeleton className="aspect-square h-auto w-[70%] min-w-26 rounded-xl object-cover shadow-lg min-[420px]:w-1/2" />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-fit flex-col gap-3">
          <Skeleton className="h-8 w-32 rounded" />
          <div className="flex w-full items-center justify-start gap-2">
            <Skeleton className="h-5 w-10 rounded" />
            <Skeleton className="h-8 w-22 rounded" />
            <Skeleton className="h-5 w-22 rounded" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="mr-1 h-8 w-22 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex h-8 items-center justify-center gap-4">
      <Skeleton className="h-8 w-full max-w-24 rounded" />
      <Separator orientation="vertical" className="w-full" />
      <Skeleton className="h-8 w-full max-w-32 rounded" />
      <Separator orientation="vertical" className="w-full" />
      <Skeleton className="h-8 w-full max-w-36 rounded" />
    </CardContent>
  </Card>
);

export default HeroSkeleton;
