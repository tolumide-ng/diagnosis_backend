import faker from 'faker';
import db from '../database/models';
import Baserepository from '../Baserepository';

export const createDiagnosis = async () => ({
  categoryCode: faker.random.alphaNumeric(),
  diagnosisCode: faker.random.alphaNumeric(),
  fullCode: faker.random.alphaNumeric(),
  abbreviatedCode: faker.random.alphaNumeric(),
  fullDescription: faker.lorem.sentence(),
  categoryTitle: faker.lorem.word(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
