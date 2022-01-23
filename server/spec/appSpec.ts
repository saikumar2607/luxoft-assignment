import { startServer, stopServer } from "./utils";
import { get, post } from "./request-promise";
import { createData, deleteData } from "../utils/default-scripts";
let adminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AMTIzLmNvbSIsImlhdCI6MTY0MjkxNTIxMywiZXhwIjoxNjc0NDUxMjEzfQ.9ER_lMCc9A18qlQGjLI1FksypsFo_W38uH60tBDHaWg`;
let userToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzQDEyMy5jb20iLCJpYXQiOjE2NDI5MTUyNzIsImV4cCI6MTY3NDQ1MTI3Mn0.gavkVo8i_43RoHf9Vf8ejqBjyVmh8jtsBlzk0KkBmwU`;
describe("App tests", () => {
    beforeAll((done) => {
        startServer().then(() => {
            createData().then(() => {
                done();
            });
        });
    });

    afterAll((done) => {
        stopServer().then(() => {
            deleteData().then(() => {
                done();
            });
        });
    });
    it("should get users list", (done) => {
        get(`/api/users/list`, {
            headers: { "Authorization": `Bearer ${adminToken}` },
        }).then((resp: any) => {
            const { response } = resp;
            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(resp.body).list.length).toBeGreaterThan(0);
            done();
        });
    });
    it("shoud throw error", (done) => {
        get(`/api/users/list`, {
            headers: { "Authorization": `Bearer ${userToken}` },
        }).then((resp: any) => {
            const { response } = resp;
            expect(response.statusCode).toEqual(403);
            done();
        });
    });
});
