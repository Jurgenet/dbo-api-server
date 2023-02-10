import { path } from 'app-root-path'
import { UPLOAD_FOLDER } from './files.constants'

export function getUploadsFolder () {
  return `${path}/${UPLOAD_FOLDER}`
}
