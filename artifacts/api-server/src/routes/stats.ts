import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import { db, projectsTable, certificatesTable, experiencesTable, skillsTable, contactsTable } from "@workspace/db";
import { GetStatsSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats/summary", async (_req, res): Promise<void> => {
  const [
    [{ totalProjects }],
    [{ totalCertificates }],
    [{ totalExperiences }],
    [{ totalSkills }],
    [{ unreadMessages }],
    [{ featuredProjects }],
  ] = await Promise.all([
    db.select({ totalProjects: count() }).from(projectsTable),
    db.select({ totalCertificates: count() }).from(certificatesTable),
    db.select({ totalExperiences: count() }).from(experiencesTable),
    db.select({ totalSkills: count() }).from(skillsTable),
    db.select({ unreadMessages: count() }).from(contactsTable).where(eq(contactsTable.read, false)),
    db.select({ featuredProjects: count() }).from(projectsTable).where(eq(projectsTable.featured, true)),
  ]);

  res.json(
    GetStatsSummaryResponse.parse({
      totalProjects,
      totalCertificates,
      totalExperiences,
      totalSkills,
      unreadMessages,
      featuredProjects,
    })
  );
});

export default router;
