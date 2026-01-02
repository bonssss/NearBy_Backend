import { Router } from "express";
import { createPlace } from "../controlllers/places.controller";

const router = Router();

router.post("/", createPlace);

export default router;
