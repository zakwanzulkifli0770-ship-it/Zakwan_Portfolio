import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, contactsTable } from "@workspace/db";
import {
  ListContactsResponse,
  CreateContactBody,
  MarkContactReadParams,
  MarkContactReadResponse,
} from "@workspace/api-zod";
import { sendContactNotification } from "../lib/email";

const router: IRouter = Router();

router.get("/contacts", async (_req, res): Promise<void> => {
  const contacts = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt));
  res.json(ListContactsResponse.parse(contacts));
});

router.post("/contacts", async (req, res): Promise<void> => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [contact] = await db.insert(contactsTable).values(parsed.data).returning();
  res.status(201).json(contact);
});

router.patch("/contacts/:id/read", async (req, res): Promise<void> => {
  const params = MarkContactReadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [contact] = await db
    .update(contactsTable)
    .set({ read: true })
    .where(eq(contactsTable.id, params.data.id))
    .returning();
  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.json(MarkContactReadResponse.parse(contact));
});

export default router;
