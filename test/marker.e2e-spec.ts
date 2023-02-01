import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreateMarkerDto } from '../src/modules/marker/dto/create-marker.dto'
import { MARKER_NOT_FOUND } from '../src/modules/marker/marker.constants'

const endpoint = '/marker'
const dtoId = '__e2e-test-marker-identity'
const invalidDtoId = '__e2e-nonexistent-invalid-marker-idenifier'

const testDto: CreateMarkerDto = {
  _id: dtoId,
  ancestor: 'root',
  group: 'etc',
  textColor: '#cfcfcf',
  bgColor: '#000000',
}

describe('MarkerController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST /marker (success)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body._id).toEqual(dtoId)
      })
  })

  it('POST /marker (fail)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send({ ...testDto, group: 42 })
      .expect(400)
  })

  it('GET /marker (success)', () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0)
      })
  })

  it('GET /marker/:id (success)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${dtoId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0]._id).toEqual(dtoId)
      })
  })

  it('GET /marker/:id (fail)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${invalidDtoId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('DELETE /marker/:id (success)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${dtoId}`)
      .expect(200)
  })

  it('DELETE /marker/:id (fail)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${invalidDtoId}`)
      .expect(404, {
        statusCode: 404,
        message: MARKER_NOT_FOUND,
      })
  })

  afterAll(() => {
    disconnect()
  })
})
