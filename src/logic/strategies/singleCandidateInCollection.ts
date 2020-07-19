import { CellCollection, GridModel, Hint } from '../../model/SudokuModel'
import { getCellsWithCandidate, GRID_SIZE } from '../sudokuLogic'

export function findSingleCandidate(grid: GridModel): Hint | undefined {
    return findSingleCandidateInCollections(grid.boxes, 'box')
        ?? findSingleCandidateInCollections(grid.columns, 'column')
        ?? findSingleCandidateInCollections(grid.rows, 'row')
}

function findSingleCandidateInCollections(collections: CellCollection[], collectionName: string): Hint | undefined {
    return collections.first(x => findSingleCandidateInCollection(x, collectionName))
}

function findSingleCandidateInCollection(collection: CellCollection, collectionName: string): Hint | undefined {
    for (let i = 1; i <= GRID_SIZE; i++) {
        const cells = getCellsWithCandidate(collection, i)
        if (cells.length === 1) {
            const cell = cells[0]
            return {
                cells: new Set<string>([cell.id]),
                affectedCells: new Set([cell.id]),
                description: `Cell ${cell.id} is the only cell in its ${collectionName} with candidate ${i}`,
                apply() {
                    cell.value = i
                }
            }
        }
    }
}
