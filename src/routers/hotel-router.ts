import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { showHotel, showHotelId } from "@/controllers";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/", showHotel)
  .get("/:hotelId", showHotelId);

export { hotelRouter };
