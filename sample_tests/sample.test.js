import {render} from '@testing-library/react'

import "@testing-library/jest-dom"

import Card from '../components/Card'



 describe("Card Component" , ()=>{
     let idea;

     beforeEach(()=>{
         idea ={
             title:"Card Testing",
             author : "Riyazur Razak",
             description: "Jest Testing Card Component",
             _id: 123456,
         }
     })

     test("Should Contain All The test Props Value In The Document", ()=>{

        const {getByText} = render(<Card idea={idea} />)
        const title = getByText(idea.title)
        const author = getByText(idea.author)
        const desc = getByText(idea.description)

        expect(title).toBeVisible()
        expect(author).toBeVisible()
        expect(desc).toContainHTML('<p class="desc">Jest Testing Card Component</p>')

     })
 })