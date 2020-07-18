import { CellCollection, GridModel, Hint } from '../../model/SudokuModel'
import { GRID_SIZE } from '../sudokuLogic'

export function findSingleCandidate(grid: GridModel): Hint | undefined {
    return findSingleCandidateInCollections(grid.boxes, 'box')
        ?? findSingleCandidateInCollections(grid.columns, 'column')
        ?? findSingleCandidateInCollections(grid.rows, 'row')
}

function findSingleCandidateInCollections(collections: CellCollection[], collectionName: string): Hint | undefined {
    return collections.map(x => findSingleCandidateInCollection(x, collectionName)).find(x => x)
}

function findSingleCandidateInCollection(collection: CellCollection, collectionName: string): Hint | undefined {
    for (let i = 1; i <= GRID_SIZE; i++) {
        const cells = collection.filter(x => x.value == null && x.candidates.has(i))
        if (cells.length === 1) {
            const cell = cells[0]
            return {
                cells: new Set<string>([cell.id]),
                description: `Cell ${cell.id} is the only candidate in its ${collectionName} with candidate ${i}`
            }
        }
    }
}
