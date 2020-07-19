export interface CellModel {
    id: string
    x: number
    y: number
    box: number
    value?: number
    candidates: Set<number>
}

export type CellCollection = CellModel[]

export interface GridModel {
    readonly rows: CellCollection[]
    readonly columns: CellCollection[]
    readonly boxes: CellCollection[]
}

export interface Hint {
    description: string
    cells: Set<string>
    affectedCells: Set<string>
    apply(): void
}