importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDR9vTfe0QRzB63bJkkp26JtUT5Khp3_o0',
  authDomain: 'smart-parking-2b92a.firebaseapp.com',
  projectId: 'smart-parking-2b92a',
  storageBucket: 'smart-parking-2b92a.firebasestorage.app',
  messagingSenderId: '802748970551',
  appId: '1:802748970551:web:b87ebab0e8c7cd5a95f1b2',
  measurementId: 'G-SNHG17695L'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
