import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { IUser } from "@/types/auth.types";

export function useProfile() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [ "profile" ],
    queryFn: () => userService.getUser()
  });

  let user = data as IUser
  return { user, isLoading, isSuccess };
}

