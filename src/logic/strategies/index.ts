import { GridModel } from '../../model/SudokuModel'
import { findSingleCandidate } from './singleCandidateInCollection'
import findPointing from './pointing'
import { findTupleElimination } from './tuples'

export function findHint(grid: GridModel) {
    return findSingleCandidate(grid)
        ?? findPointing(grid)
        ?? findTupleElimination(grid)
        ?? null
}