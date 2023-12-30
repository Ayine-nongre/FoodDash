export const makePayment = async (req, res) => {
    const data = req.body
    if (!data) return res.json({ message: "No data received"})
    const { email, amount } = data

    const params = JSON.stringify({
        "email": email,
        "amount": amount
    })

    let transaction

    await fetch("https://api.paystack.co/transaction/initialize",{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: params
        }).then( response => response.json())
        .then(data => transaction = data)
        .catch(err => console.log(err))

    res.redirect(transaction.data.authorization_url)
}