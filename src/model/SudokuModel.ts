export interface CellModel {
    id: string
    value?: number
    candidates: Set<number>
}

export interface GridModel {
    readonly rows: CellModel[][]
    readonly columns: CellModel[][]
    readonly boxes: CellModel[][]
}

export interface Hint {
    description: string
    cells: Set<string>
}