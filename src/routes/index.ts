import { Router } from "express";

// import rootApi
import api from "./api";

const router = Router();
router.use("/api", api);

export default router;
