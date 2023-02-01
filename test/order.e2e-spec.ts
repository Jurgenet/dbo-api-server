import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { disconnect, Types } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreateOrderDto } from '../src/modules/order/dto/create-order.dto'
import { ORDER_NOT_FOUND } from '../src/modules/order/order.constants'

const endpoint = '/order'

const testDto: CreateOrderDto = {
  date: 'date',
  title: 'title',
  price: 1000,
  amount: 1,
  vendor: 'vendor',
  seller: 'seller',
  link: 'link',
  markers: ['markerA', 'markerB'],
  text: 'text',
}

describe('OrderController (e2e)', () => {
  let app: INestApplication
  let docId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST /order (success)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        docId = body._id

        expect(body.date).toBe('date')
        expect(body.title).toBe('title')
        expect(body.price).toBe(1000)
        expect(body.amount).toBe(1)
        expect(body.vendor).toBe('vendor')
        expect(body.seller).toBe('seller')
        expect(body.link).toBe('link')
        expect(body.markers.length).toBeGreaterThan(0)
        expect(body.markers[0]).toBe('markerA')
        expect(body.markers[1]).toBe('markerB')
        expect(body.text).toBe('text')
      })
  })

  it('POST /order (fail)', () => {
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

  it('GET /order/:id (success)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${docId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0]._id).toEqual(docId)
      })
  })

  it('GET /order/:id (fail)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${new Types.ObjectId()}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('DELETE /order/:id (success)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${docId}`)
      .expect(200)
  })

  it('DELETE /order/:id (fail)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${new Types.ObjectId()}`)
      .expect(404, {
        statusCode: 404,
        message: ORDER_NOT_FOUND,
      })
  })

  afterAll(() => {
    disconnect()
  })
})
