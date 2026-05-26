import { Router, type IRouter } from "express";
import {
  AdminLoginBody,
  AdminLoginResponse,
  AdminLogoutResponse,
  GetAdminMeResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const ADMIN_SESSION_KEY = "portfolio_admin_session";

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  // Simple token-based session using a header or cookie
  res.setHeader("Set-Cookie", `${ADMIN_SESSION_KEY}=authenticated; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);
  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  res.setHeader("Set-Cookie", `${ADMIN_SESSION_KEY}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
  res.json(AdminLogoutResponse.parse({ success: true }));
});

router.get("/admin/me", async (req, res): Promise<void> => {
  const cookieHeader = req.headers.cookie ?? "";
  const sessionCookie = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_KEY}=`));
  const isAuthenticated = sessionCookie?.split("=")[1] === "authenticated";
  if (!isAuthenticated) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.json(GetAdminMeResponse.parse({ authenticated: true }));
});

export default router;
