const express =require('express')
const multer =require('multer')
const path =require('path')
const router = express.Router()
const UploadFile = require('../Models/UploadFile')

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'Upload/')
    },
    filename(req,file,cb){
        
        cb(null,`${file.fieldname}-${Date.now()}${path
            .extname(file.originalname)}`)
    }
})

function checkFileType (file,cb){
    const filetypes = /jpeg|jpg|png|doc|pdf/
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb( "Not a WINRAR File!!")
    }
}
const upload = multer({ storage: storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
})
router.post('/',(req,res)=>{ 
    upload.array('file')(req,res,async function(err){
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.            
            res.json({"success":false,"message":"multer uploading err"}).status(400)
          } else if (err) {
            // An unknown error occurred when uploading.

            res.json({"success":false,"message":"Format err"}).status(400)
          }else{
            try {
                //console.log(req.files)
                const newFile = await UploadFile.create({
                    file:req.files
                })
            res.status(200).json({"success":true,"message":"uploaded","file":newFile})
            } catch (error) {
                res.json({"success":false,"message":"upload failed"}).status(400)
            }
        }
    })
    
  //res.json({"success":true,"path":req.file.path})
    
    //res.send(`/${req.file.path}`)
})


module.exports=router
