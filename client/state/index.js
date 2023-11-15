import { proxy } from "valtio";

const state = proxy({
    messagesListHeight: 0,
    scollMessagesList: 0,
})


export default state;