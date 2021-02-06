import {render} from '@testing-library/react'

import "@testing-library/jest-dom"

import Component from '../components/Accordation'



 describe("Acordation Component" , ()=>{
    let testProps;

    beforeEach(()=>{
        testProps ={
            title:"Test Idea",
            visibleTo : [],
        }
    })

     test("Should render all props but Title Only Initially Visible To User", ()=>{

        const {getByText, getByPlaceholderText} = render(<Component idea={testProps} />)
        const title = getByText("Test Idea")
        const user = getByText("No Users")
        const placeholder = getByPlaceholderText("Add User by typing their username and Enter")


        expect(title).toBeVisible() //In The Window Only Title Of The Posts Only Initially Visible
        expect(user).toBeInTheDocument() //Others Should Be Be Invisible But Visible When Users Click It 
        expect(placeholder).toBeInTheDocument()

     })
 })