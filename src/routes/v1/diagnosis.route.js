import { Router } from 'express';
import DiagnosisController from '../../controller/diagnosis.controller';
import {
  createDiagnosis,
  modifyDiagnosis,
  getSpecificDiagnosis,
} from '../../validators/diagnosis.validator';

const router = Router();

router.post('/', createDiagnosis, DiagnosisController.createDiagnosis);
router.put('/:id', modifyDiagnosis, DiagnosisController.modifyDiangosis);
router.get('/', DiagnosisController.getAllDiagnosis);
router.get('/:id', getSpecificDiagnosis, DiagnosisController.getSpecificDiagnosis);
router.delete('/:id', getSpecificDiagnosis, DiagnosisController.deleteDiagnosis);

export default router;
