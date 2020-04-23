import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firebase = admin.initializeApp();
// حذف صور الاعلان
export const deletePhotos = functions.firestore
  .document("RENT_COLLECTION/{postId}")
  .onDelete((snap, context) => {
    const { postId } = context.params;
    const bucket = firebase.storage().bucket();
    console.log(postId);


    return bucket.deleteFiles({
      prefix: `ads-images/${postId}`
    });
  });
// حذف صور الاعلان للبيع  
export const deletePhotosForSale = functions.firestore
  .document("SALE_COLLECTION/{postId}")
  .onDelete((snap, context) => {
    const { postId } = context.params;
    const bucket = firebase.storage().bucket();
    console.log(postId);
    return bucket.deleteFiles({
      prefix: `ads-images/${postId}`
    });
  });

// حذف صور المستخدم
export const mDeleteUserPhoto = functions.firestore
  .document("users/{postId}")
  .onDelete((snap, context) => {
    const { postId } = context.params;
    const bucket = firebase.storage().bucket();
    console.log(postId);
    console.log(snap.data());
    return bucket.deleteFiles({
      prefix: `users-images/${postId}`
    });

  })
// رسالة بخصوص الاعلان
  export const notifyNewMessage = functions.firestore
  .document('chatChannels/{channel}/messages/{message}')
  .onCreate((docSnapshot, context) => {
  const recipientId = docSnapshot.get('recipientId');
  const senderName = docSnapshot.get('senderName');
  const adNo = docSnapshot.get('ad');
  const messageType = docSnapshot.get('type');
  const messageText = docSnapshot.get('text');
  const senderId = docSnapshot.get('senderId');
  const TAG = 'newMessage'
  const action = "show_message"

  return admin.firestore().doc('users/' + recipientId).get().then(userDoc => {
    const registrationTokens = userDoc.get('registrationTokens')
    const notificationBody = (messageType === "TEXT") ? messageText : "You received a new image message."
    const payload = {
      notification: {
        title: " لديك رسالة جديدة من " + ( senderName ) ,
        body: notificationBody + ` :اعلان رقم ${adNo['ad_no']}`,
        clickAction: "ChatActivity"
      },
      data: {
        USER_NAME: senderName,
        USER_ID: senderId,
        AD_ID:adNo['ad_no'],
        TAG: TAG,
        ACTION:action,

      }
    }

    return admin.messaging().sendToDevice(registrationTokens, payload).then(response => {
      const stillRegisteredTokens = registrationTokens

      response.results.forEach((result, index) => {
        const error = result.error
        if (error) {
          const failedRegistrationToken = registrationTokens[index]
          console.error('blah', failedRegistrationToken, error)
          if (error.code === 'messaging/invalid-registration-token'
            || error.code === 'messaging/registration-token-not-registered') {
            const failedIndex = stillRegisteredTokens.indexOf(failedRegistrationToken)
            if (failedIndex > -1) {
              stillRegisteredTokens.splice(failedIndex, 1)
            }
          }
        }
      })

      return admin.firestore().doc("users/" + recipientId).update({
        registrationTokens: stillRegisteredTokens
      })
    })
  })
})

