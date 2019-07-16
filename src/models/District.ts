import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  urban: {
    type: String,
    required: true,
    unique: true
  },
  subDistrict: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true,
    unique: true
  },
  province: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
});

interface IDistrict {
  urban: string;
  subDistrict: string;
  city: string;
  province: string;
  postalCode: string;
}

mongoose.model("District", districtSchema);

export { IDistrict };
