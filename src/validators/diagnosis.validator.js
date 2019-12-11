import { sanitize } from 'indicative';
import { validatorInstance, sanitizeRules, messages } from '../helpers/validatorUtils';

import { responseGenerator } from '../helpers/responseGenerator';

export const createDiagnosis = async (req, res, next) => {
  const rules = {
    categoryCode: 'required|alpha_numeric',
    diagnosisCode: 'required|alpha_numeric',
    fullCode: 'required|alpha_numeric',
    abbreviatedCode: 'required|alpha_numeric',
    fullDescription: 'required|string',
    categoryTitle: 'required|string',
  };

  const data = req.body;

  try {
    sanitize(data, sanitizeRules);

    await validatorInstance.validateAll(data, rules, messages);

    next();
  } catch (error) {
    return responseGenerator.sendError(res, 400, error);
  }
};

export const modifyDiagnosis = async (req, res, next) => {
  const rules = {
    categoryCode: 'alpha_numeric',
    diagnosisCode: 'alpha_numeric',
    fullCode: 'alpha_numeric',
    abbreviatedCode: 'alpha_numeric',
    fullDescription: 'string',
    categoryTitle: 'string',
  };

  const data = req.body;

  try {
    sanitize(data, sanitizeRules);

    await validatorInstance.validateAll(data, rules, messages);

    next();
  } catch (error) {
    return responseGenerator.sendError(res, 400, error);
  }
};

export const getSpecificDiagnosis = async (req, res, next) => {
  const rules = {
    id: 'required|number',
  };
  const data = req.params;
  try {
    sanitize(data, sanitizeRules);
    await validatorInstance.validateAll(data, rules, messages);
    next();
  } catch (error) {
    return responseGenerator.sendError(res, 400, error);
  }
};
