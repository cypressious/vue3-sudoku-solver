import { CellCollection, CellModel, GridModel, Hint } from '../../model/SudokuModel'
import { allValues, getCellsWithCandidate } from '../sudokuLogic'

export default function findPointing(grid: GridModel): Hint | undefined {
    return grid.boxes.map(box => findPointingInBox(grid, box)).find(x => x)
}

function findPointingInBox(grid: GridModel, box: CellCollection): Hint | undefined {
    return allValues()
        .map(candidate => findPointingInBoxForCandidate(grid, box, candidate) ?? findReversePointingInBoxForCandidate(grid, box, candidate))
        .find(x => x)
}

/**
 * Look for pointing pairs in box that eliminate candidates from the same row/column,
 * i.e. a candidate is restricted to one row/column within a box, so all other appearances of this candidate can be
 * eliminated from the same row/column.
 */
function findPointingInBoxForCandidate(grid: GridModel, box: CellCollection, candidate: number): Hint | undefined {
    const cellsWithCandidate = getCellsWithCandidate(box, candidate)

    return findPointingWithDirection(cellsWithCandidate, grid, candidate, 'rows', 'y', 'box')
        ?? findPointingWithDirection(cellsWithCandidate, grid, candidate, 'columns', 'x', 'box')
}

/**
 * Look for pointing pairs in rows/column intersecting the box that eliminate candidates from the box,
 * i.e. a candidate within an intersecting row/column is restricted to this box so all other appearances of this
 * candidate inside the box can be eliminated.
 */
function findReversePointingInBoxForCandidate(grid: GridModel, box: CellCollection, candidate: number): Hint | undefined {
    const firstCell = box[0]

    for (let x = firstCell.x; x < firstCell.x + 3; x++) {
        const cellsWithCandidate = getCellsWithCandidate(grid.columns[x], candidate)
        const hint = findPointingWithDirection(cellsWithCandidate, grid, candidate, 'boxes', 'box', 'x')
        if (hint) {
            return hint
        }
    }

    for (let y = firstCell.y; y < firstCell.y + 3; y++) {
        const cellsWithCandidate = getCellsWithCandidate(grid.rows[y], candidate)
        const hint = findPointingWithDirection(cellsWithCandidate, grid, candidate, 'boxes', 'box', 'y')
        if (hint) {
            return hint
        }
    }
}

type Coordinate = 'x' | 'y' | 'box'

function findPointingWithDirection(
    cellsWithCandidate: CellModel[],
    grid: GridModel,
    candidate: number,
    collection: 'rows' | 'columns' | 'boxes',
    coordinate1: Coordinate,
    coordinate2: Coordinate
): Hint | undefined {
    if (new Set(cellsWithCandidate.map(cell => cell[coordinate1])).size != 1) return

    const collectionIndex = cellsWithCandidate[0][coordinate1]
    const cellsWithEliminations = grid[collection][collectionIndex]
        .filter(cell => cell.candidates.has(candidate) && cell[coordinate2] !== cellsWithCandidate[0][coordinate2])

    if (cellsWithEliminations.length) {
        return toHint(cellsWithCandidate, cellsWithEliminations, candidate)
    }
}

function toHint(cellsInTuple: CellModel[], cellsWithPossibleEliminations: CellModel[], candidate: number): Hint {
    const tuple = cellsInTuple.map(x => x.id).sort().join(', ')
    const eliminated = cellsWithPossibleEliminations.map(x => x.id).sort().join(', ')

    return {
        cells: new Set(cellsInTuple.map(x => x.id)),
        affectedCells: new Set(cellsWithPossibleEliminations.map(x => x.id)),
        description: `Pointing tuple ${tuple} eliminates candidate ${candidate} from ${eliminated}.`,
        apply() {
            for (let cell of cellsWithPossibleEliminations) {
                cell.candidates.delete(candidate)
            }
        }
    }
}
