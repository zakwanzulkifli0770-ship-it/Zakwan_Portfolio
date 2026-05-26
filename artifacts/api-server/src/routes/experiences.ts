import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, experiencesTable } from "@workspace/db";
import {
  ListExperiencesQueryParams,
  ListExperiencesResponse,
  CreateExperienceBody,
  UpdateExperienceParams,
  UpdateExperienceBody,
  UpdateExperienceResponse,
  DeleteExperienceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/experiences", async (req, res): Promise<void> => {
  const query = ListExperiencesQueryParams.safeParse(req.query);
  const conditions = [];
  if (query.success && query.data.type) {
    conditions.push(eq(experiencesTable.type, query.data.type));
  }
  const experiences = await db
    .select()
    .from(experiencesTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(experiencesTable.createdAt));
  res.json(ListExperiencesResponse.parse(experiences));
});

router.post("/experiences", async (req, res): Promise<void> => {
  const parsed = CreateExperienceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [exp] = await db.insert(experiencesTable).values(parsed.data).returning();
  res.status(201).json(exp);
});

router.patch("/experiences/:id", async (req, res): Promise<void> => {
  const params = UpdateExperienceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateExperienceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [exp] = await db
    .update(experiencesTable)
    .set(parsed.data)
    .where(eq(experiencesTable.id, params.data.id))
    .returning();
  if (!exp) {
    res.status(404).json({ error: "Experience not found" });
    return;
  }
  res.json(UpdateExperienceResponse.parse(exp));
});

router.delete("/experiences/:id", async (req, res): Promise<void> => {
  const params = DeleteExperienceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [exp] = await db
    .delete(experiencesTable)
    .where(eq(experiencesTable.id, params.data.id))
    .returning();
  if (!exp) {
    res.status(404).json({ error: "Experience not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
