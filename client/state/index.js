import { proxy } from "valtio";

const state = proxy({
    isInputShown:false,
    isSidebarShown:false,
    isResponseInputShown:false,
    messageResponseData:{}
})


export default state;