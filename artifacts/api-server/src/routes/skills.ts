import { Router, type IRouter } from "express";
import { eq, desc, and, count } from "drizzle-orm";
import { db, skillsTable } from "@workspace/db";
import {
  ListSkillsQueryParams,
  ListSkillsResponse,
  CreateSkillBody,
  UpdateSkillParams,
  UpdateSkillBody,
  UpdateSkillResponse,
  DeleteSkillParams,
  GetSkillsByCategoryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats/skills-by-category", async (_req, res): Promise<void> => {
  const results = await db
    .select({ category: skillsTable.category, count: count() })
    .from(skillsTable)
    .groupBy(skillsTable.category)
    .orderBy(skillsTable.category);
  res.json(GetSkillsByCategoryResponse.parse(results));
});

router.get("/skills", async (req, res): Promise<void> => {
  const query = ListSkillsQueryParams.safeParse(req.query);
  const conditions = [];
  if (query.success && query.data.category) {
    conditions.push(eq(skillsTable.category, query.data.category));
  }
  const skills = await db
    .select()
    .from(skillsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(skillsTable.proficiency));
  res.json(ListSkillsResponse.parse(skills));
});

router.post("/skills", async (req, res): Promise<void> => {
  const parsed = CreateSkillBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [skill] = await db.insert(skillsTable).values(parsed.data).returning();
  res.status(201).json(skill);
});

router.patch("/skills/:id", async (req, res): Promise<void> => {
  const params = UpdateSkillParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateSkillBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [skill] = await db
    .update(skillsTable)
    .set(parsed.data)
    .where(eq(skillsTable.id, params.data.id))
    .returning();
  if (!skill) {
    res.status(404).json({ error: "Skill not found" });
    return;
  }
  res.json(UpdateSkillResponse.parse(skill));
});

router.delete("/skills/:id", async (req, res): Promise<void> => {
  const params = DeleteSkillParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [skill] = await db
    .delete(skillsTable)
    .where(eq(skillsTable.id, params.data.id))
    .returning();
  if (!skill) {
    res.status(404).json({ error: "Skill not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
