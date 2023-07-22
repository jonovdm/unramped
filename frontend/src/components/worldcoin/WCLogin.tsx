import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { Grid, TextField, Button } from '@mui/material'

const WORLD_ID_APP_ID = 'app_staging_652d13fba418780249c08a121c6ecb40'
const WORLD_ID_APP_ACTION = 'register'

export default function WorldCoin() {
    const onSuccess = (result: ISuccessResult) => {
        // const uid = result.nullifier_hash;
        // console.log(result)

        localStorage.setItem("worldcoinHash", result.nullifier_hash);
        window.location.href = "/setup";
    };

    const handleProof = async (result: ISuccessResult) => {
        const reqBody = {
            merkle_root: result.merkle_root,
            nullifier_hash: result.nullifier_hash,
            proof: result.proof,
            credential_type: result.credential_type,
            action: WORLD_ID_APP_ACTION,
            signal: "",
        };
        localStorage.setItem("worldcoinReqBody", JSON.stringify(reqBody));
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <IDKitWidget
                action={WORLD_ID_APP_ACTION!}
                onSuccess={onSuccess}
                handleVerify={handleProof}
                app_id={WORLD_ID_APP_ID!}
                credential_types={[CredentialType.Orb, CredentialType.Phone]}
            >
                {({ open }) =>
                    <Button variant="contained" onClick={open}>
                        Verify with World ID
                    </Button>
                }
            </IDKitWidget>
        </div>
    );
}