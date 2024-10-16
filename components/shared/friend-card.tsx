"use client";

import { getFriendStatus } from "@/app/utils/data";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function FriendCard({ user }: { user: User }) {
  const {
    data: friendStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [user.id, "friend-status"],
    queryFn: () => getFriendStatus(user.id),
  });

  return (
    <div className="space-y-2 border border-gray-300 rounded-xl p-4 bg-white hover:bg-gray-100 transition-colors">
      <div className="flex gap-2 justify-between">
        <Avatar>
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {isLoading ? (
          <Skeleton>
            <Button size={"custom"} variant={"secondary"} className="size-4">
              Loading
            </Button>
          </Skeleton>
        ) : (
          <>
            {friendStatus?.status === "ACCEPTED" && (
              <CheckCircle2 className="size-4 text-green-500" />
            )}
          </>
        )}
      </div>
      <div>{user.name}</div>
      <div className="flex gap-2">
        <Badge>Soccer</Badge>
      </div>
    </div>
  );
}

export function FriendCardSkeleton() {
  return (
    <div className="space-y-2 border border-gray-300 rounded-xl p-4">
      <div className="flex gap-2 justify-between">
        <Avatar isLoading>
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
      </div>

      <div>
        <Skeleton>Name</Skeleton>
      </div>
      <div className="flex gap-2">
        <Skeleton>
          <Badge>Soccer</Badge>
        </Skeleton>
      </div>
    </div>
  );
}
