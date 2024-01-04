import * as SecureStore from "expo-secure-store";

const saveUserRooms = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync("userRooms", jsonValue);
    console.log("Data successfully saved");
  } catch (e) {
    console.log(e);
  }
};

const getUserRooms = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync("userRooms");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const deleteRoom = async (roomId) => {
  try {
    const userRooms = await getUserRooms();
    if (userRooms) {
      const updatedRooms = userRooms.filter((room) => room._id !== roomId);
      await saveUserRooms(updatedRooms);
    }
  } catch (error) {
    console.log(error);
  }
};

export { saveUserRooms, getUserRooms, deleteRoom };
