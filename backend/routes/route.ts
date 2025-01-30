import express, { Request, Response } from "express"
import { loginController } from "../controllers/login.controller"
import { verifyToken } from "../middleware/verifytoken"
import { getGaleri, addGaleriItem, deleteGaleriItem, updateGaleriItem, getHizmetler, addHizmet, updateHizmet, getKurumsal, updateKurumsal} from "../controllers/crud.controller"
import { uploadImage} from '../controllers/upload.controller'
import { contactController, getContact } from "../controllers/contact.controller"
import { commentController, getcomment, likeCommentController, deleteComment } from "../controllers/comment.controller"

const router = express.Router()


router.post('/login', loginController)
router.get('/verify-token', verifyToken, (req: Request, res: Response) => {
    if (req.user) {
        res.json(req.user); 
    } else {
        res.status(401).json({ message: 'Geçersiz token' });
    }
});
router.get('/galeri', async (req: Request, res: Response) => {
  await getGaleri(req, res)
})
router.post('/galeriadd', async (req: Request, res: Response) => {
  await addGaleriItem(req, res)
})
router.delete('/galeri/:id', async (req: Request, res: Response) => {
  await deleteGaleriItem(req, res)
})

router.put('/galeri/:id', async (req: Request, res: Response) => {
  await updateGaleriItem(req, res)
})
router.post('/upload', async (req: Request, res: Response) => {
  await uploadImage(req, res)
})

// Hizmetler routes
router.get('/hizmetler', async (req: Request, res: Response) => {
  await getHizmetler(req, res)
})

router.post('/hizmetadd', async (req: Request, res: Response) => {
  await addHizmet(req, res)
})



router.put('/hizmet/:id', async (req: Request, res: Response) => {
  await updateHizmet(req, res)
})

// Kurumsal routes
router.get('/kurumsal', async (req: Request, res: Response) => {
  await getKurumsal(req, res)
})

router.put('/kurumsal/update', async (req: Request, res: Response) => {
  await updateKurumsal(req, res)
})

router.post(`/contact`,contactController)
router.get(`/contact`,getContact)
router.post(`/comment`,commentController)
router.get(`/comment`,getcomment)
router.post(`/comment/:id/like`, likeCommentController)
router.delete('/comment/:id', deleteComment)
export default router