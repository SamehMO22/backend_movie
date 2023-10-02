import connectDB from "../../DB/connection.js"

import  * as Routers from '../module/index.routers.js'


export const initiaApp =(app , express)=>{
    const port = process.env.port || 5500
    app.use(express.json({}))
    connectDB()
    app.use(`/user`, Routers.authRouter)
    app.use(`/mo`   , Routers.newnewsRouter)
    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Plz check url  or  method")
    })
    app.listen(port , ()=>{console.log(`server is runing ${port}`)})
























}

export default initiaApp