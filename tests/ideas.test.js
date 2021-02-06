import {render} from '@testing-library/react'

import "@testing-library/jest-dom"

import Ideas from '../pages/ideas'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../reducers';



 describe("Ideas Page" , ()=>{

    let props;

     beforeEach(()=>{
         props =[{
             title:"Test Idea 1",
             author : "Riyazur Razak",
             description: "Jest Testing Card Component",
             _id: 123456,
         },
         {
            title:"Test Idea 2",
            author : "Riyazur Razak",
            description: "Jest Testing Card Component",
            _id: 123498,
        }]
     })
    
     const store = createStore(allReducers)
   
     test("Map All The Ideas Props To The Card Component", ()=>{

        

        const {getByText} = render(<Provider store={store}><Ideas data={props} /></Provider> )
        const title = getByText("Test Idea 1")
        const title2 = getByText("Test Idea 2")



        expect(title).toBeVisible()
        expect(title2).toBeVisible()

     })
 })


 