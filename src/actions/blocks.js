import { GET_NODE_BLOCKS_FAILURE, GET_NODE_BLOCKS_START, GET_NODE_BLOCKS_SUCCESS } from '../constants/actionTypes';

export const getNodeBlocksFailure = (node,error) => ({
    type: GET_NODE_BLOCKS_FAILURE,
    node,
    error
})

export const getNodeBlocksStart = (node) => ({
    type: GET_NODE_BLOCKS_START,
    node,
})

export const getNodeBlocksSuccess = (node, blocks) => ({
    type: GET_NODE_BLOCKS_SUCCESS,
    node,
    blocks
})


export function getNodeBlocks(node) {
    return async (dispatch) => {
        try {
            const endpoint = `${node.url}/api/v1/blocks`

            dispatch(getNodeBlocksStart(node))

            const response = await fetch(endpoint);

            const blocksJson = await response.json();
            const blocks = blocksJson.data;

            dispatch(getNodeBlocksSuccess(node, blocks))
        } catch (error) {

            dispatch(getNodeBlocksFailure(error))

        }
    }
}