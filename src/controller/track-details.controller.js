import express from "express";
import { TrackService } from "../services/index";

const trackDetailsController = express.Router();
const trackService = new TrackService();

trackDetailsController.get("/", async (req, res, next) => {
  try {
    const trackDetails = await trackService.getTrackDetails(
      decodeURIComponent(req.query.host),
      decodeURIComponent(req.query.shareUrl)
    );
    res.status(200).send(trackDetails);
  } catch (error) {
    next(error);
  }
});

export default trackDetailsController;
