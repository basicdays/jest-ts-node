import Router from "express-promise-router";

const router = Router();
export default router;

/* GET home page. */
router.get("/", function (_req, res) {
	res.json({ status: "ok" });
});
