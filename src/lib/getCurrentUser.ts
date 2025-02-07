import { usePrivy } from "@privy-io/react-auth";

export function useCurrentUserPrivyId(): () => Promise<string> {
  const { user } = usePrivy();

  return async function getCurrentUserPrivyId(): Promise<string> {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    // Verify the user actually exists in Privy's system
    const isValid = await fetch(`https://auth.privy.io/api/v1/users/${user.id}/verify`);
    if (!isValid.ok) throw new Error('Invalid user session');

    return user.id;
  };
}