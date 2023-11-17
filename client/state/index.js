import { proxy } from "valtio";

const state = proxy({
    messagesListHeight: 0,
    scollMessagesList: 0,
    isInputShown:false,
    isSidebarShown:false,
})


export default state;