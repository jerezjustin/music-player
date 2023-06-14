import type State from '@/enums/State'

export interface UploadingFile {
    task: Object
    name: string
    state: State
    icon: string
    current_progress: number
}
