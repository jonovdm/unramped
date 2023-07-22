// This function fetches Base Experience, Weight, Height of Pokemon results from Poke API
// Args include name of pokemon
const moneriumURL = "https://api.monerium.dev/auth/token"

console.log(`Sending HTTP request to ${moneriumURL}`)

const moneriumRequest = Functions.makeHttpRequest({
    url: `${moneriumURL}`,
    method: "POST",
    params: {
        'grant_type': 'client_credentials',
        'client_id': '4ef7adfa-20be-11ee-ad2d-92520e0bb667',
        'client_secret': '5037b5cba40761bc500d3317f6eb6fb8c6bcae50b5aa56f3b3359932148b1ae0'
    }
})

// Execute the API request (Promise)
const moneriumResponse = await moneriumRequest

if (moneriumResponse.error) {
    console.error(moneriumResponse.error)
    throw Error("Request failed, try checking the params provided")
}

// console.log(moneriumResponse)

// gets the Base Experience, Weight, Height of Pokemon
const reqData = moneriumResponse.data

// Gives the whole response from the request
// console.log(reqData)

// result is in JSON object, containing Base Experience, Weight, Height of Pokemon
const myData = {
    access_token: reqData.access_token,
    expires_in: reqData.expires_in,
    refresh_token: reqData.refresh_token,
    token_type: reqData.token_type
}

const memo = args[0]
const orderRequest = Functions.makeHttpRequest({
    url: `https://api.monerium.dev/orders?`,
    method: "GET",
    headers: {
        "Authorization": "Bearer " + myData.access_token
    },
    params: {
        memo: memo
    }
})

// Execute the API request (Promise)
const orderResponse = await orderRequest

if (orderResponse.error) {
    console.error(orderResponse.error)
    throw Error("Request failed, try checking the params provided")
}

const orderReqData = orderResponse.data

// console.log(JSON.stringify(orderReqData))

// This will get the first result with this memo => memo's would always be unique
// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
if (orderReqData[0].meta.state == "processed") {
    return Functions.encodeUint256(1)
}
else {
    return Functions.encodeString(0)
}

//on UI use memo -> smart contract orderID bytes as Argument