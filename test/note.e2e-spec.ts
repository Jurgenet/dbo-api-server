import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { disconnect, Types } from 'mongoose'
import { AppModule } from '../src/app.module'
import { CreateNoteDto } from '../src/modules/note/dto/create-note.dto'
import { NOTE_NOT_FOUND } from '../src/modules/note/note.constants'

const endpoint = '/note'

const testDto: CreateNoteDto = {
  title: 'title',
  text: 'text',
  links: [{ label: 'linkA', reference: 'referenceA' }],
  markers: ['markerA', 'markerB'],
  isPinned: true,
}

describe('NoteController (e2e)', () => {
  let app: INestApplication
  let docId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('POST /note (success)', () => {
    return request(app.getHttpServer())
      .post(endpoint)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        docId = body._id

        expect(body.title).toBe('title')
        expect(body.text).toBe('text')
        expect(body.links.length).toBeGreaterThan(0)
        expect(body.links[0].label).toBe('linkA')
        expect(body.links[0].reference).toBe('referenceA')
        expect(body.markers.length).toBeGreaterThan(0)
        expect(body.markers[0]).toBe('markerA')
        expect(body.markers[1]).toBe('markerB')
        expect(body.isPinned).toBeTruthy()
      })
  })

  it('POST /note (fail)', () => {
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

  it('GET /note/:id (success)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${docId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0]._id).toEqual(docId)
      })
  })

  it('GET /note/:id (fail)', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}/${new Types.ObjectId()}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('DELETE /note/:id (success)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${docId}`)
      .expect(200)
  })

  it('DELETE /note/:id (fail)', () => {
    return request(app.getHttpServer())
      .delete(`${endpoint}/${new Types.ObjectId()}`)
      .expect(404, {
        statusCode: 404,
        message: NOTE_NOT_FOUND,
      })
  })

  afterAll(() => {
    disconnect()
  })
})
