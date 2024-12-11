import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDR9vTfe0QRzB63bJkkp26JtUT5Khp3_o0',
  authDomain: 'smart-parking-2b92a.firebaseapp.com',
  projectId: 'smart-parking-2b92a',
  storageBucket: 'smart-parking-2b92a.firebasestorage.app',
  messagingSenderId: '802748970551',
  appId: '1:802748970551:web:b87ebab0e8c7cd5a95f1b2',
  measurementId: 'G-SNHG17695L'
};

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

// {
//   "type": "service_account",
//   "project_id": "smart-parking-2b92a",
//   "private_key_id": "e9231261345103a940688826c1aa254b90a8893b",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDFElnlzVALKGkq\nQiNGeA9VOSNPmc9vlwpHIQvPzZeYrta1gCKYT9kUxuV7elDLiO7onzZGuDuIK191\nHPa2H2RW5UB421Uob3DTCtKmlzLOBnkY6k5pBpADWZFDF+FYoeklbPw3K1G2qIZv\n/tJgpKqLMv/HmxtWa0mJ8ufWzIyLM9CBsJlafJ5sWOpAojhK2sh3aSkgwJxbNT2y\nyjqcX1cyMCaXPPsigH67FA8dD1pzhcTdPMclT8KO1gVWfIxj2H04sy+G0pGV4YgZ\nnHmSYUMn+waa8NVK9w8qBkpngERk7oDvYY4tYoO2SwLfpSEGWul6ASD49ivs5xPg\nePQ/+H81AgMBAAECgf9SwOH/Hbf+93kxxZQKg1/s6ZFqW6w/r60hMT9Eg5ClDMYc\ncTIVw3Hkx6CVuUc0MMwh4rln+PUGuS/cfc0brRL1ak8ocPHRiPpXpLPQQK2U1iMD\n02AZuie/QF0/T0fRcCv3C0zd3dLyYNITNW4iJwN2cHP33aodH/BBfT7ddAeQa/T5\nmoVTRWNq7XqtZEOIgFTlOd/FGik1xhgsB7KpOLbl+zl26pW7WPld296DThyGZ+mC\nmyUxk+PkanxQa8AHeo1cUFWEmKhKJFY4pca6vA20hG5rbbN6EnvC5BwJUObxBi9E\nOARkRWs5Ini/76YnXNaT9AL1+zM83EcQMMs54kECgYEA5AAVkjhMOJU0ChpWNLBA\nj5RRGmhDXso7vpRwdN9xUex8OABLIcjWl9+oMKFXDXUV3dKOBV5mfpvg0QWk1arp\n8j4yNWLUcifylcDSELiNTxAzlBYelf7O5hG3BOAh+tPawDEC+2rdpv7yPJ1AYskX\ncmHU5fYUQyPLP89nl2Iae1UCgYEA3UXtMisFBiKYnmlIlQxHMf0m5Q5GoggzHZxE\nplMmR6pyJq5sX4vVd5y2UklLprNhw4VH/JkiOB0YBoV0u5qekoFfLIzwm4ibS/mS\nc9wu9p4ownIal6JtUMjU7/ipcqC7V0Ul718BJVy58pcnEV/EFGhyRL3Wz0JqYMAt\nFtBYtGECgYEAjEyg+YE7JfZqN21Nbs6ma7PQ1HckPcgkS3n8WW7FxKvJJIzJrthv\ndLVkQciGUPmjowRV8GfOmkpBZV4buH+bxj0PmFpgcH60gAJPQYrPKb/GfXG/EH3j\nwx9Th+SEBF0pVurR8vQnwQNQ/IuneyJTE0ewQnHSth3ojDOMg1MTCKECgYBIwLEY\niaSBO+bKTvuaZgsSmJWtQmBe7itAVR0NQtGXRqd5qGfhkmyBg3k+3PKOwPQoAS6G\nEyN5J7e6jS6wcEorCXZtg3mo6eWFuW05wu9+DsqABFxR9wnSQfYhYLT2B3sRWp76\ncVZDHpXU+XXS9JXXz++iQnjadI/dd9Jbae2AgQKBgH6H8zuFKKt7bOJIKvLww1QU\nbwa9Hl6Of437l4GeCplvAOZsUh8EOSrJARNXVIlENM69y/RtSlxmwqjW+RJCSmcp\n/J/wNN1hWLYQL0rDFjEN27YzC5+LAbO1ewFDLGX/yb0x0HLsfhAVTUocPt8WsVyA\nJC3EpEKOE5OPaw6WF6GT\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-dxvov@smart-parking-2b92a.iam.gserviceaccount.com",
//   "client_id": "104679888065196402696",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dxvov%40smart-parking-2b92a.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
