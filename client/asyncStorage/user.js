import * as SecureStore from "expo-secure-store";

const saveUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync("user", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getUserData = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const deleteUserData = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
  } catch (error) {
    console.log(error);
  }
};

export { saveUserData, getUserData, deleteUserData };
