import { CellModel, GridModel, Hint, CellCollection } from '../../model/SudokuModel'
import { GRID_SIZE } from '../sudokuLogic'

export default function findPointing(grid: GridModel): Hint | undefined {
    return grid.boxes.map(box => findPointingInBox(grid, box)).find(x => x)
}

function findPointingInBox(grid: GridModel, box: CellCollection): Hint | undefined {
    return Array.from({ length: GRID_SIZE }, (_, x) => findPointingInBoxForValue(grid, box, x + 1))
        .find(x => x)
}

function findPointingInBoxForValue(grid: GridModel, box: CellCollection, candidate: number): Hint | undefined {
    const cellsWithCandidate = box.filter(x => x.value == null && x.candidates.has(candidate))

    return findPointingWithDirection(cellsWithCandidate, grid, candidate, 'row')
        ?? findPointingWithDirection(cellsWithCandidate, grid, candidate, 'column')
}

function findPointingWithDirection(
    cellsWithCandidate: CellModel[],
    grid: GridModel,
    candidate: number,
    type: 'row' | 'column'
): Hint | undefined {
    const coordinate = type === 'row' ? 'y' : 'x'

    const set = new Set(cellsWithCandidate.map(cell => cell[coordinate]))
    if (set.size != 1) {
        return
    }

    const y = cellsWithCandidate[0][coordinate]
    const collection = type === 'row' ? grid.rows : grid.columns
    const cellsWithEliminations = collection[y]
        .filter(cell => cell.candidates.has(candidate) && !cellsWithCandidate.some(inBox => inBox.x === cell.x))

    if (cellsWithEliminations.length) {
        return toHint(cellsWithEliminations, cellsWithCandidate, candidate)
    }
}

function toHint(cellsWithEliminations: CellModel[], cellsWithCandidate: CellModel[], candidate: number) {
    const tuple = cellsWithCandidate.map(x => x.id).sort().join(', ')
    const eliminated = cellsWithEliminations.map(x => x.id).sort().join(', ')

    return {
        cells: new Set<string>(cellsWithCandidate.map(x => x.id)),
        description: `Pointing tuple ${tuple} eliminates candidate ${candidate} from ${eliminated}.`
    }
}
