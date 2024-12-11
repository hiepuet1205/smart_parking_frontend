import { messaging } from 'src/firebase/config'
import { getToken, onMessage } from 'firebase/messaging'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export function useFCM() {
  const $q = useQuasar()
  const fcmToken = ref<string>('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = ref<any>(null)

  const showNotification = (title: string, message: string) => {
    $q.notify({
      message: message,
      caption: title,
      icon: 'notifications',
      color: 'primary',
      position: 'top-right',
      timeout: 5000,
      actions: [
        { 
          label: 'Dismiss', 
          color: 'white',
          handler: () => { /* dismiss */ } 
        }
      ]
    })
  }

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        // Thay YOUR_VAPID_KEY bằng VAPID key của bạn
        const token = await getToken(messaging, {
          vapidKey: 'BOx3jbs3Mro2mvplCmdCvYaThaRw5ntC_PlySRePY63IjNAi7CjYSU_N4pB8r7GtZs_UmzsC_wjW-viAoNsahbg'
        })
        fcmToken.value = token
        return token
      }
    } catch (error) {
      console.error('FCM permission error:', error)
    }
  }

  const onMessageListener = () => {
    onMessage(messaging, (payload) => {
      message.value = payload
      
      // Hiển thị notification bằng Quasar Notify
      if (payload.notification) {
        showNotification(
          payload.notification.title || 'New Message',
          payload.notification.body || ''
        )
      }
    })
  }

  return {
    fcmToken,
    message,
    requestPermission,
    onMessageListener
  }
}
