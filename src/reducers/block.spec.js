import * as actions from '../actions'
import { GET_NODE_BLOCKS_START, GET_NODE_BLOCKS_SUCCESS } from '../constants/actionTypes'
import reducer from './nodes'

describe('Reducers/Blocks', () => {
    const nodeOne = {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false,
        blocks: {
          list: [],
          error: null
        }
    }

    const nodeTwo = {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false,
        blocks: {
          list: [],
          error: null
        }      
    }
    
    const nodeThree = {
        url: 'https://calm-anchorage-82141.herokuapp.com',
        online: false,
        name: 'Node 3',
        loading: false,
        blocks: {
          list: [],
          error: null
        }
    }    

    it(`should handle ${GET_NODE_BLOCKS_START}`, () => {
        const state = {
            list: [
                nodeOne,
                nodeTwo,
                nodeThree,
            ]
        }

        const action = actions.getNodeBlocksStart(nodeOne);

        expect(reducer(state, action)).toEqual({
            list: [
                {
                    ...nodeOne,
                    loading: true,
                    blocks: {
                        list: [],
                        error: null,
                    },
                },
                nodeTwo,
                nodeThree
            ]
        })
    })

    it(`should handle ${GET_NODE_BLOCKS_SUCCESS}`, () => {
        const state = {
            list: [
                nodeOne,
                nodeTwo,
                nodeThree,
            ]
        }

        const blockOne = {
            id:"5",
            type:"blocks",
            attributes:{
               index:1,
               timestamp:1530679678,
               data:"The Human Torch",
               ['previous-hash']:"KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
               hash:"oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
            }           
        }

        const blocks = {
            list: [
                blockOne
            ],
            error: null
        }

        const action = actions.getNodeBlocksSuccess(nodeOne, blocks.list);

        expect(reducer(state, action)).toEqual({
            list: [
                {
                    ...nodeOne,
                    loading: false,
                    blocks,
                },
                nodeTwo,
                nodeThree
            ]
        })
    })
      
})