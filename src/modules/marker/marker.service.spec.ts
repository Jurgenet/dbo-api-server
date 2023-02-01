import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { MarkerService } from './marker.service'

describe('MarkerService', () => {
  let service: MarkerService

  const exec = { exec: jest.fn() }

  const markerRepositoryFactory = () => ({
    find: () => exec
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarkerService,
        { useFactory: markerRepositoryFactory, provide: getModelToken('MarkerModel') },
      ],
    }).compile()

    service = module.get<MarkerService>(MarkerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })


  it('should work find method', async () => {
    const id = 'root'

    markerRepositoryFactory().find().exec.mockReturnValueOnce([{ _id: id }])

    const res = await service.findById(id)

    expect(res[0]._id).toBe(id)
  })
})
