import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
  provinceId: {
    type: String,
    required: true,
    unique: true
  },
  provinceName: {
    type: String,
    required: true,
    unique: true
  },
  provinceNameEn: {
    type: String,
    required: true,
    unique: true
  }
});

interface IProvince {
  provinceId: string;
  provinceName: string;
  provinceNameEn: string;
}

mongoose.model("Province", provinceSchema);

export { IProvince };
