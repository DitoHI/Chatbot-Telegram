import Api from "../Api";
import { IProvince } from "../../../models/Province";
import { IDistrict } from "../../../models/District";
import responseCode from "../../../config/responseCode";

class LocationApi extends Api {
  constructor(props: any) {
    super(props);

    this.getListProvince = this.getListProvince.bind(this);
    this.getListDistrict = this.getListDistrict.bind(this);
  }

  getListProvince(req: any, res: any) {
    super
      .get(req.body, req.query)
      .then((province: IProvince) => {
        return res.status(responseCode.ok.code).json({
          data: {
            province
          },
          success: true
        });
      })
      .catch((err: string) => {
        return res.status(responseCode.badRequest.code).json({
          message: err,
          success: false
        });
      });
  }

  getListDistrict(req: any, res: any) {
    super
      .get(req.body, req.query)
      .then((district: IDistrict) => {
        return res.status(responseCode.ok.code).json({
          data: {
            district
          },
          success: true
        });
      })
      .catch((err: string) => {
        return res.status(responseCode.badRequest.code).json({
          message: err,
          success: false
        });
      });
  }
}

export default LocationApi;
