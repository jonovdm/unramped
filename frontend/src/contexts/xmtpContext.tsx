import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Client as XMTPClient } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

import { useAuth } from '../AuthContext';
import Disconnected from '../components/monerium/Disconnected';

export const XMTPContext = createContext<XMTPClient | null>(null);

export const XMTPProvider = ({ children }: PropsWithChildren) => {
    const { isLoggedIn, provider: authProvider } = useAuth();
    console.log(authProvider)
    if (!isLoggedIn) return <Disconnected />

    // Return a placeholder if authProvider or selectedSafe is not available
    if (!authProvider) return <></>;

    const provider = new ethers.providers.Web3Provider(authProvider);
    const safeOwner = provider.getSigner();
    const [xmtpClient, setXmtpClient] = useState<XMTPClient | null>(null);

    useEffect(() => {
        if (!safeOwner) {
            return;
        }
        console.log(safeOwner)
        XMTPClient.create(safeOwner, { env: 'production' })
            .then(setXmtpClient);
    }, [safeOwner]);

    return (
        <XMTPContext.Provider value={xmtpClient}>
            {children}
        </XMTPContext.Provider>
    );
};
