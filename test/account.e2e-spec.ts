import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { disconnect, Types } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreateAccountDto } from '../src/modules/account/dto/create-account.dto'
import { ACCOUNT_NOT_FOUND } from '../src/modules/account/account.constants'

const endpoint = '/account'

const testDto: CreateAccountDto = {
  title: 'title',
  group: 'group',
  email: 'email',
  login: 'login',
  password: 'password',
  link: 'link',
  markers: ['markerA', 'markerB'],
  text: 'text',
}

describe('AccountController (e2e)', () => {
  let app: INestApplication
  let docId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST /account (success)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        docId = body._id

        expect(body.title).toBe('title')
        expect(body.group).toBe('group')
        expect(body.email).toBe('email')
        expect(body.login).toBe('login')
        expect(body.password).toBe('password')
        expect(body.link).toBe('link')
        expect(body.markers.length).toBeGreaterThan(0)
        expect(body.markers[0]).toBe('markerA')
        expect(body.markers[1]).toBe('markerB')
      })
  })

  it('POST /account (fail)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send({ ...testDto, title: 42 })
      .expect(400)
  })

  it('GET /note (success)', () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0)
      })
  })

  it('GET /account/:id (success)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${docId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0]._id).toEqual(docId)
      })
  })

  it('GET /account/:id (fail)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${new Types.ObjectId()}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('DELETE /account/:id (success)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${docId}`)
      .expect(200)
  })

  it('DELETE /account/:id (fail)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${new Types.ObjectId()}`)
      .expect(404, {
        statusCode: 404,
        message: ACCOUNT_NOT_FOUND,
      })
  })

  afterAll(() => {
    disconnect()
  })
})
