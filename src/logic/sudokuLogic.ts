import { CellCollection, GridModel } from '@/model/SudokuModel'

export const GRID_SIZE = 9

export function newGrid(): GridModel {
    let rows = Array.from({ length: GRID_SIZE }, (_, y) =>
        Array.from({ length: GRID_SIZE }, (_, x) =>
            ({ candidates: new Set<number>(), id: `R${y + 1}C${x + 1}`, x, y })))

    const boxes: CellCollection[] = []

    for (let y = 0; y < GRID_SIZE / 3; y++) {
        for (let x = 0; x < GRID_SIZE / 3; x++) {
            const cells = rows.slice(y * 3, (y + 1) * 3).map(row => row.slice(x * 3, (x + 1) * 3)).flatMap(cells => cells)
            boxes.push(cells)
        }
    }

    return {
        rows,
        columns: transpose(rows),
        boxes
    }
}

function transpose<T>(matrix: T[][]): T[][] {
    return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

export function checkGrid(grid: GridModel): boolean {
    return grid.rows.every(checkCollection)
        && grid.columns.every(checkCollection)
        && grid.boxes.every(checkCollection)
}

function checkCollection(collection: CellCollection): boolean {
    let numbers = new Set<number>()
    for (let cell of collection) {
        if (!cell.value) continue
        if (numbers.has(cell.value)) return false

        numbers.add(cell.value)
    }

    return true
}

export function computeCandidates(grid: GridModel) {
    for (let column of grid.columns) {
        for (let cell of column) {
            cell.candidates.clear()

            if (cell.value != null) continue
            for (let i = 1; i <= 9; i++) {
                cell.candidates.add(i)
            }
        }
    }

    eliminateCandidatesInCollection(grid.columns)
    eliminateCandidatesInCollection(grid.rows)
    eliminateCandidatesInCollection(grid.boxes)
}

function eliminateCandidatesInCollection(collections: CellCollection[]) {
    for (let collection of collections) {
        const toRemove = new Set<number>()

        for (let cell of collection) {
            if (cell.value != null) {
                toRemove.add(cell.value)
            }
        }

        for (let cell of collection) {
            for (let candidateToRemove of toRemove) {
                cell.candidates.delete(candidateToRemove)
            }
        }
    }
}
