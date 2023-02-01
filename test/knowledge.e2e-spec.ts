import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { disconnect, Types } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreateKnowledgeDto } from '../src/modules/knowledge/dto/create-knowledge.dto'
import { KNOWLEDGE_NOT_FOUND } from '../src/modules/knowledge/knowledge.constants'

const endpoint = '/knowledge'

const testDto: CreateKnowledgeDto = {
  type: 'type',
  date: 'date',
  title: 'title',
  platform: 'platform',
  author: 'author',
  lang: 'lang',
  cover: 'cover',
  location: 'location',
  link: 'link',
  text: 'text',
  isActive: false,
  isOnline: false,
  isDone: false,
  markers: ['markerA', 'markerB'],
  rating: 4,
}

describe('KnowledgeController (e2e)', () => {
  let app: INestApplication
  let docId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST /knowledge (success)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        docId = body._id

        expect(body.type).toBe('type')
        expect(body.date).toBe('date')
        expect(body.title).toBe('title')
        expect(body.platform).toBe('platform')
        expect(body.author).toBe('author')
        expect(body.lang).toBe('lang')
        expect(body.cover).toBe('cover')
        expect(body.location).toBe('location')
        expect(body.link).toBe('link')
        expect(body.text).toBe('text')
        expect(body.markers.length).toBeGreaterThan(0)
        expect(body.markers[0]).toBe('markerA')
        expect(body.isActive).toBeFalsy()
        expect(body.isOnline).toBeFalsy()
        expect(body.isDone).toBeFalsy()
        expect(body.markers[1]).toBe('markerB')
        expect(body.rating).toBe(4)
      })
  })

  it('POST /knowledge (fail)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send({ ...testDto, title: 42 })
      .expect(400)
  })

  it('GET /knowledge (success)', () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0)
      })
  })

  it('GET /knowledge/:id (success)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${docId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0]._id).toEqual(docId)
      })
  })

  it('GET /knowledge/:id (fail)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${new Types.ObjectId()}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('DELETE /knowledge/:id (success)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${docId}`)
      .expect(200)
  })

  it('DELETE /knowledge/:id (fail)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${new Types.ObjectId()}`)
      .expect(404, {
        statusCode: 404,
        message: KNOWLEDGE_NOT_FOUND,
      })
  })

  afterAll(() => {
    disconnect()
  })
})
