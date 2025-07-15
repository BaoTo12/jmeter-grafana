import app from "./src/app.js"

const PORT = process.env.APP_PORT || 3052

app.listen(PORT, () => {
    console.log(`Started WebService eCommerce with PORT:${PORT} `);
})