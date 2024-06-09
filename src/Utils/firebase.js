import firestore from '@react-native-firebase/firestore';

export const sendMessage = async (chatId, senderId, receiverId, text) => {
  const message = {
    text,
    createdAt: firestore.FieldValue.serverTimestamp(),
    senderId,
    receiverId,
  };
  await firestore()
    .collection('Chats')
    .doc(chatId)
    .collection('messages')
    .add(message);
};

export const getMessages = (chatId, callback) => {
  const messagesListener = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const messages = snapshot?.docs?.map(doc => {
        const firebaseData = doc.data();

        const data = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          ...firebaseData,
        };
      });
      callback(messages);
      return data;
    });

  return () => messagesListener();
};

export const createChat = async (user1Id, user2Id) => {
  const chatId =
    user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
  const chatDoc = firestore().collection('chats').doc(chatId);
  const chat = await chatDoc.get();

  if (!chat.exists) {
    await chatDoc.set({
      members: [user1Id, user2Id],
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  }

  return chatId;
};
