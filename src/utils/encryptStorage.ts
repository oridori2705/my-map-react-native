import EncryptedStorage from 'react-native-encrypted-storage';

//값 저장
async function setEncryptStorage<T>(key: string, data: T) {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
}

// 값 가져오기
async function getEncryptStorage(key: string) {
  const storedData = await EncryptedStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
}

//값 제거하기
async function removeEncryptStorage(key: string) {
  const data = await getEncryptStorage(key);

  if (data) {
    await EncryptedStorage.removeItem(key);
  }
}

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
