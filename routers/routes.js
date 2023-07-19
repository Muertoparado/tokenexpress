import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
const app = Router();


app.get("/", async (req,res)=>{
    let json=JSON.stringify(req.body)

    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({json});
    
    const jwt = await jwtconstructor
    .setProtectedHeader({alg:"HS256",typ:"JWT"})
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    res.cookie('data',jwt,{httpOnly: true});
    console.log(`data: ${jwt}`);
    res.send(({jwt}));
});

app.post('/',async (req,res)=>{
    const {authorization}=req.headers;
    if(!authorization) return res.status(401).send({message:"error :("});
    try{
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        console.log(jwtData);
        res.send(jwtData);
    }catch(error){
        res.status(401).send({message:"error tiempo :("});
    }
});

export default app;