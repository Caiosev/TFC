import TeamController from "../controller/TeamController";
import { Router } from "express";

const router = Router();

const teamController = new TeamController();

router.get("/teams", teamController.getAll);
router.get("/teams/:id", teamController.get);