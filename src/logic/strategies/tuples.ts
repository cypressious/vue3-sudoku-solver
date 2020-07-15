import { CellModel, GridModel, Hint } from '../../model/SudokuModel'
import { subsets } from '../setHelpers'
import { addLink, Graph, GraphNode, newGraph } from '../graph'

export function findTupleElimination(grid: GridModel): Hint | undefined {
    return grid.rows.map(findTuplesInCollection).find(x => x)
        ?? grid.columns.map(findTuplesInCollection).find(x => x)
        ?? grid.boxes.map(findTuplesInCollection).find(x => x)
}

function findTuplesInCollection(collection: CellModel[]): Hint | undefined {
    const graph = buildGraph(collection)

    while (graph.size) {
        const node = graph.values().next().value

        if (!node) return

        const component = getComponent(graph)

        if (component.size != 1) {
            for (let subset of subsets([...component])) {
                if (subset.length < 2 || subset.length == component.size) continue

                const candidates = new Set<number>()

                for (let cell of subset) {
                    cell.candidates.forEach(candidates.add, candidates)
                }

                if (candidates.size == subset.length && subset.length < component.size) {
                    let description = `${[...candidates].sort().join('')}-Tuple in ${subset.map(x => x.id).sort().join(', ')}.\n`

                    description += [...component]
                        .filter(x => !subset.includes(x))
                        .map(cell => {
                            const remainingCandidates = [...cell.candidates]
                                .filter(candidate => !candidates.has(candidate))
                                .sort()
                                .join('')

                            return `${cell.id} is reduced to ${remainingCandidates}.`
                        })
                        .join('\n')

                    return {
                        description,
                        cells: new Set(subset.map(x => x.id))
                    }
                }
            }
        }

        for (let n of component) {
            graph.delete(n)
        }
    }
}

function buildGraph(collection: CellModel[]): Graph<CellModel> {
    const graph = newGraph<CellModel>()

    for (let cell of collection) {
        if (cell.value != null) continue

        for (let otherCell of collection) {
            if (otherCell.value != null) continue
            if (cell.id === otherCell.id) continue

            if ([...cell.candidates].filter(x => otherCell.candidates.has(x)).length) {
                addLink(graph, cell, otherCell)
            }
        }
    }

    return graph
}

/**
 * Return a subgraph where all nodes are connected transitively.
 */
function getComponent(graph: Graph<CellModel>): Set<CellModel> {
    const component = new Set<CellModel>()

    function visitNode(n: GraphNode<CellModel>) {
        if (!component.has(n.value)) {
            component.add(n.value)
            n.linked.forEach(visitNode)
        }
    }

    if (graph.size) {
        visitNode(graph.values().next().value)
    }

    return component
}

