import { MoneriumClient } from '@monerium/sdk'

const checkAuth = async () => {
    const clientId = "3a5a7ef2-202b-11ee-8572-f64924a85452"
    const auth = "3a58a605-202b-11ee-8572-f64924a85452"

    const client = new MoneriumClient();

    await client.auth({
        client_id: clientId,
        client_secret: auth
    })

    // // User is now authenticated, get authentication data
    // const authData = await client.getAuthContext()
    // console.log(authData)
}

checkAuth()