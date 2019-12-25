import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../../app';
import Baserepository from '../../Baserepository';
import db from '../../database/models';
import helpers from '../../helpers/validatorUtils';
import { createDiagnosis } from '../utils';

const DIAGNOSIS_API = '/api/v1/diagnos';

const server = () => supertest(app);

describe('POST api/v1/diagnos', () => {
  beforeEach(async () => {
    await db.Diagnosis.destroy({ cascade: true, truncate: true });
  });

  it('should create a new diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    const res = await server()
      .post(`${DIAGNOSIS_API}`)
      .send(diagnosis);

    expect(res.body.message).to.equal('Diagnosis created successfully');
    expect(res.status).to.equal(201);
  });

  it('should not create a diagnosis with validation error', async () => {
    const errorDiagnosis = await createDiagnosis();
    errorDiagnosis.diagnosisCode = '';

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    const res = await server()
      .post(`${DIAGNOSIS_API}`)
      .send(errorDiagnosis);

    expect(res.body.message[0].message).to.equal('diagnosisCode is required');
    expect(res.status).to.equal(400);
  });

  it('should be able to get information about all available diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    await Baserepository.create(db.Diagnosis, diagnosis);

    const newNumberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(newNumberOfDiagnosis.length).to.equal(1);

    const res = await server()
      .get(`${DIAGNOSIS_API}/`)
      .send(diagnosis);

    expect(res.body.data.length).to.equal(1);
    expect(res.body.data[0].categoryCode).to.equal(diagnosis.categoryCode);
    expect(res.status).to.equal(200);
  });

  it('should return appropriate response if there are no diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const res = await server()
      .get(`${DIAGNOSIS_API}/`)
      .send(diagnosis);

    expect(res.body.message).to.equal('There are currently no diagnosis at the moment');
    expect(res.status).to.equal(404);
  });

  it('should be able to get information about a specific diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    await Baserepository.create(db.Diagnosis, diagnosis);

    const newNumberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(newNumberOfDiagnosis.length).to.equal(1);

    const res = await server().get(`${DIAGNOSIS_API}/${newNumberOfDiagnosis[0].dataValues.id}`);

    expect(res.body.data.categoryCode).to.equal(diagnosis.categoryCode);
    expect(res.status).to.equal(200);
  });

  it('should be able to delete a specific diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    await Baserepository.create(db.Diagnosis, diagnosis);

    const newNumberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(newNumberOfDiagnosis.length).to.equal(1);

    const res = await server().delete(
      `${DIAGNOSIS_API}/${newNumberOfDiagnosis[0].dataValues.id}`,
    );

    expect(Object.keys(res.body.data).length).to.equal(0);
    expect(res.status).to.equal(203);

    const numberOfDiagnosisAfterDelete = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosisAfterDelete.length).to.equal(0);
  });

  it('should be able to modify an existing diagnosis', async () => {
    const diagnosis = await createDiagnosis();

    const numberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(numberOfDiagnosis.length).to.equal(0);

    await Baserepository.create(db.Diagnosis, diagnosis);

    const newNumberOfDiagnosis = await Baserepository.findAll(db.Diagnosis);
    expect(newNumberOfDiagnosis.length).to.equal(1);

    const res = await server()
      .put(`${DIAGNOSIS_API}/${newNumberOfDiagnosis[0].dataValues.id}`)
      .send({ categoryCode: '287bm' });


    expect(res.status).to.equal(200);
  });
});
