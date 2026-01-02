import { Router } from "express";
import { createPlace ,getNearbyPlaces} from "../controlllers/places.controller";

const router = Router();

router.post("/", createPlace);
router.get("/nearby", getNearbyPlaces);

export default router;
