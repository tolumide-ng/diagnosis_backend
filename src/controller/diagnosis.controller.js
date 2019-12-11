import Baserepository from '../Baserepository';
import db from '../database/models';
import Pagination from '../helpers/pagination';
import { responseGenerator } from '../helpers/responseGenerator';

class DiagnosisController {
  static async createDiagnosis(req, res) {
    const {
      categoryCode,
      diagnosisCode,
      fullCode,
      abbreviatedCode,
      fullDescription,
      categoryTitle,
    } = req.body;

    const diagnosis = await Baserepository.create(db.Diagnosis, {
      categoryCode,
      diagnosisCode,
      fullCode,
      abbreviatedCode,
      fullDescription,
      categoryTitle,
    });

    return responseGenerator.sendSuccess(
      res,
      201,
      { diagnosis },
      'Diagnosis created successfully',
    );
  }

  static async modifyDiangosis(req, res) {
    const { id } = req.params;
    const {
      categoryCode,
      diagnosisCode,
      fullCode,
      abbreviatedCode,
      fullDescription,
      categoryTitle,
    } = req.body;

    const diagnosis = await Baserepository.findAndUpdate(
      db.Diagnosis,
      {
        categoryCode,
        diagnosisCode,
        fullCode,
        abbreviatedCode,
        fullDescription,
        categoryTitle,
      },
      { id },
    );
    if(diagnosis[0] < 1){
      return responseGenerator.sendError(res, 404, 'Resource not Found')
    }

    return responseGenerator.sendSuccess(res, 200, { diagnosis });
  }

  static async deleteDiagnosis(req, res) {
    const { id } = req.params;
    await Baserepository.remove(db.Diagnosis, { id });

    return responseGenerator.sendSuccess(res, 203, {});
  }

  static async getSpecificDiagnosis(req, res) {
    const { id } = req.params;
    const specificDiagnosis = await Baserepository.findOneByField(db.Diagnosis, { id });
    if (!specificDiagnosis) {
      return responseGenerator.sendError(res, 400, 'Diagnosis does not exist');
    }
    return responseGenerator.sendSuccess(res, 200, specificDiagnosis);
  }

  static async getAllDiagnosis(req, res) {
    const { page = 1 } = req.query;
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();
    const { count, rows: allDiagnosis } = await Baserepository.findAndCountAll(db.Diagnosis, {
      limit,
      offset,
      attributes: [
        'id',
        'categoryCode',
        'diagnosisCode',
        'fullCode',
        'abbreviatedCode',
        'fullDescription',
        'categoryTitle',
      ],
    });


    if(allDiagnosis.length < 1){
      return responseGenerator.sendError(res, 404, 'There are currently no diagnosis at the moment')
    }

    return responseGenerator.sendSuccess(
      res,
      200,
      allDiagnosis,
      null,
      paginate.getPageMetaData(count, '/api/v1/diagnos'),
    );
  }

}

export default DiagnosisController;
