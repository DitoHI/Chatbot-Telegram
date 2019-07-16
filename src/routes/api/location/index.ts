import express from "express";

import LocationApi from "./LocationApi";

const router = express.Router();

const provinceModelName = "Province";
const provinceController = new LocationApi(provinceModelName);
const districtModelName = "District";
const districtController = new LocationApi(districtModelName);

// list of endpoints

router.post("/list_province", provinceController.getListProvince);
router.post("/list_district", districtController.getListDistrict);

export default router;
