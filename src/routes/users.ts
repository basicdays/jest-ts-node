import Router from "express-promise-router";

const router = Router();
export default router;

/* GET users listing. */
router.get("/", function (_req, res) {
	res.json({ user: "me" });
});
