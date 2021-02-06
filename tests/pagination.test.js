import {render} from '@testing-library/react'

import "@testing-library/jest-dom"

import Ideas from '../pages/ideas'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../reducers';




describe("Ideas Page Pagination" , ()=>{

    let props;

     beforeEach(()=>{
         props =[{
             title:"Test Idea 1",
             author : "Riyazur Razak",
             description: "Jest Testing Card Component 1",
             _id: 123456,
         },
         {
            title:"Test Idea 2",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component 2",
            _id: 123498,
        },
        {
            title:"Test Idea 3",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component 3",
            _id: 123498,
        },
        {
            title:"Test Idea 4",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component 4",
            _id: 123498,
        },
        {
            title:"Test Idea 5",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component 5",
            _id: 123498,
        },
        {
            title:"Test Idea 6",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component 6",
            _id: 123498,
        }]
     })
    
     const store = createStore(allReducers)
   
     test("Check If Only 5 ideas is visible and others are paginate in next page", ()=>{

        

        const {getByText,} = render(<Provider store={store}><Ideas data={props} /></Provider> )
        const card_1 = getByText("Test Idea 1")
        const card_4 = getByText("Jest Testing Card Component 4")
        const pageNum = getByText("2")



        expect(card_1).toBeVisible()
        expect(card_4).toBeVisible()
        expect(pageNum).toBeVisible()

     })
 })