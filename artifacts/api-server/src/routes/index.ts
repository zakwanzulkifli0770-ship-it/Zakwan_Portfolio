import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import certificatesRouter from "./certificates";
import experiencesRouter from "./experiences";
import skillsRouter from "./skills";
import contactsRouter from "./contacts";
import adminRouter from "./admin";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(certificatesRouter);
router.use(experiencesRouter);
router.use(skillsRouter);
router.use(contactsRouter);
router.use(adminRouter);
router.use(statsRouter);

export default router;
