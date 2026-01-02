import { Router } from "express";
import { createPlace ,getNearbyPlaces,getAllPlaces} from "../controlllers/places.controller";

const router = Router();

router.post("/", createPlace);
router.get("/nearby", getNearbyPlaces);
router.get("/", getAllPlaces);

export default router;
