import ideas from '../pages/api/ideas'

import {createMocks} from 'node-mocks-http'
import initDB from '../Utils/db'


describe("ideas api", ()=>{
    beforeAll(()=>{
        initDB()
    })

    test("check api to get datas from db",async ()=>{
        const { req, res } = createMocks({
            method: 'GET',
          });

          await ideas(req, res)
          expect(res._getStatusCode()).toBe(200);
    })
})