export interface GraphNode<T> {
    value: T
    linked: Set<GraphNode<T>>
}

export type Graph<T> = Map<T, GraphNode<T>>

export function newGraph<T>(): Graph<T> {
    return new Map()
}

export function getOrAddNode<T>(graph: Graph<T>, value: T): GraphNode<T> {
    let node = graph.get(value)

    if (node) return node

    node = { value, linked: new Set() }
    graph.set(value, node)

    return node
}

export function addLink<T>(graph: Graph<T>, a: T, b: T) {
    const nodeA = getOrAddNode(graph, a)
    const nodeB = getOrAddNode(graph, b)

    nodeA.linked.add(nodeB)
    nodeB.linked.add(nodeA)
}