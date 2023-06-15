import type State from '@/enums/State'
import type { UploadTask } from 'firebase/storage'

export interface UploadingFile {
    task: UploadTask
    name: string
    state: State
    icon: string
    current_progress: number
}
