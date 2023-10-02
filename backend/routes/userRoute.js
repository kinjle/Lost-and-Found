const express = require("express")
const {User} = require("../models/users")
const router = express.Router()
const checkAuth = require("../middleware/checkAuth")
const e = require("express")

//-----------------------------FULL NAME----------------------------------------------------------

router.get("/details", checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) res.send(user)
    else res.status(404).send({"error": `User with id ${req.user._id} not founf`})
})

router.get("/", async(req, res)=> {
    const fullname = req.query.fname;
    if (fullname){
        const fname = await User.find({fullname});
        if (fname) {
            res.send({"msg": "Full name found", fname})
        }
        else {
            res.status(404).send({"msg":"Full name not found"})
        }
    }
    else {
        const fnames = await User.find()
        res.send({fnames})
    }
})

router.post("/", async(req, res)=>{
    try{
        const savedFname= await User.create(req.body)
        res.send({ msg: "Full name added", savedFname})
    }
    catch(e){
        console.log(e.message)
    }
})

router.put("/:id", async (req, res) =>{
    const fname = await User.findByIdAndUpdate(
        req.params.fname,
        {
            $set: req.body,
        },
        { new: true }
    )
    res.send({ msg: "Full name updated", fname })
})

router.delete("/:id", async (req, res) =>{
    const fname = await User.findByIdAndDelete(
        req.params.id,
        deletedFname = deletedFname.filter((fname) => fname.id !== id)
    )
    res.send({ msg: "Full name deleted from database" })
})

module.exports = router;