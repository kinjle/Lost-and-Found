const express = require("express")
const {Response} = require("../models/users")
const router = express.Router()

router.get("/", async(req, res)=> {
    const answer = req.query.answer;
    if (answer){
        const ans = await Response.find({answer});
        if (ans) {
            res.send({"msg": "Response found", ans})
        }
        else {
            res.status(404).send({"msg":"Response not found"})
        }
    }
    else {
        const answers = await User.find()
        res.send({answers})
    }
})

router.post("/", async(req, res)=>{
    try{
        const savedAns= await Response.create(req.body)
        res.send({ msg: "Response added", savedAns})
    }
    catch(e){
        console.log(e.message)
    }
})

router.put("/:id", async (req, res) =>{
    const answer = await Response.findByIdAndUpdate(
        req.params.answer,
        {
            $set: req.body,
        },
        { new: true }
    )
    res.send({ msg: "Response updated", answer })
})

router.delete("/:id", async (req, res) =>{
    const answer = await Response.findByIdAndDelete(
        req.params.id,
        deletedAns = deletedAns.filter((answer) => answer.id !== id)
    )
    res.send({ msg: "Response deleted from database" })
})

module.exports = router;