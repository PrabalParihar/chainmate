"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function PrivyClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cm6t61peh0795fjz58mxbdkun"
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: '/brain-circuit.png', // Assuming the image is in the public folder
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}