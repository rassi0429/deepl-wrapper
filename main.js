const axios = require("axios")
const express = require("express")

const DEEPL_ENDPOINT = "https://api-free.deepl.com/v2/translate"

const app = express()
app.listen(3030, () => console.log("OK"))

app.get("/translate", async (req, res) => {
    const text = req.query.text
    const to = req.query.to
    if (!text || !to) {
        res.status(400).send("BAD_REQUEST")
        return
    }
    var params = new URLSearchParams();
    params.append('auth_key', process.env.DEEPL_TOKEN);
    params.append("text", text);
    params.append("target_lang", to);
    const { data } = await axios.post(DEEPL_ENDPOINT,params)
    console.log(data)
    res.send(data.translations[0].text)
})

