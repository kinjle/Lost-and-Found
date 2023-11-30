const express = require("express")
const {Item} = require("../models/users")
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/checkAuth');

//------------------------ITEMS----------------------------------------------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename );
    }
  });
  
  // Create a multer middleware instance with the configured storage
  const upload = multer({ storage: storage });

router.get("/",checkAuth, async(req, res)=> {
    
    try {
        const items = await Item.find().populate('author', '-password')
        res.send({items})
    } catch {
        res.status(400).send({msg: "error occured"})
    }
})

router.get("/myclaim", checkAuth, async(req, res)=> {
    try {
        const items = await Item.find({claimedBy: req.user._id}).populate("author", "phoneNumber")
        res.send({items})
    } catch {
        res.status(400).send({msg: "error occured"})
    }
})


router.get("/user/", checkAuth, async(req, res)=> {
    
    try {
        const items = await Item.find({author: req.user._id})
        res.send({items})
    } catch {
        res.status(400).send({msg: "error occured"})
    }
})

router.post("/",upload.single('itemImage'), checkAuth, async(req, res)=>{
    try{
        req.body.itemImage = `http://localhost:3000\\uploads\\${req.file.filename}`
        req.body.author = req.user.id;
        const item= await Item.create(req.body)
        res.send({ msg: "data added", item})
    }
    catch(e){
        res.send(e.message)
    }
})

router.put("/claim/:id", checkAuth, async (req, res) => {
    const {answer} = req.body
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                answer,
                isClaimed: true,
                claimedBy: req.user._id,
                isVerified: true,
                isRejected: false
            },
        },
        { new: true }
    )
    res.send({ msg: "data updated", item })
})

router.put("/acceptclaim/:id", checkAuth, async (req, res) => {
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                isVerified:true,
                isRejected:false
            },
        },
        { new: true }
    )
    res.send({ msg: "data updated", item })
})

router.put("/rejectclaim/:id", checkAuth, async (req, res) => {
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                isVerified:true,
                isRejected:true,
                isClaimed: false
            },
        },
        { new: true }
    )
    res.send({ msg: "data updated", item })
})

router.put("/:id", async (req, res) =>{
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    )
    res.send({ msg: "data updated", item })
})

router.delete("/:id", async (req, res) =>{
    const item = await Item.findByIdAndDelete(
        req.params.id,
    )
    res.send({ msg: "item deleted from database" })
})

//------------------------ITEM SECURITY QUESTION-----------------------------------------------

router.get("/:id/securityQues", async(req, res)=> {
    const securityQues = req.query.item;
    if (securityQues){
        const item = await Item.find({securityQues});
        if (item) {
            res.send({"msg": "Security question found", item})
        }
        else {
            res.status(404).send({"msg":"Item not found"})
        }
    }
    else {
        const items = await Item.find()
        res.send({items})
    }
})

router.post("/:id/securityQues", async(req, res)=>{
    try{
        const {securityQues} = req.body
        console.log(securityQues)
        const savedSecQues= await Item.create(securityQues)
        res.send({ msg: "Security question added", savedSecQues})
    }
    catch(e){
        console.log(e.message)
    }
})

router.put("/:id/securityQues", async (req, res) =>{
    const securityQues = await Item.findByIdAndUpdate(
        req.params.item,
        {
            $set: req.body,
        },
        { new: true }
    )
    res.send({ msg: "Security question updated", securityQues })
})

router.delete("/:id/securityQues", async (req, res) =>{
    const securityQues = await Item.findByIdAndDelete(
        req.params.id,
        deletedSecQues = deletedSecQues.filter((securityQues) => securityQues.id !== id)
    )
    res.send({ msg: "Security question deleted from database" })
})

module.exports = router;

//----------------------------------------------------------------------------------------

router.get("/claimedItems", checkAuth, async (req,res) => {
    try {
        const items = await Item.find({claimedBy: req.user._id})
        res.send({items})
    } catch {
        res.status(400).send({msg: "error occured"})
    }
})