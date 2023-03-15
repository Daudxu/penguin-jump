import app from './modules/app'
import user from './modules/user'
import home from './modules/home'


export default function Store() {
    return {
      useAppStore: app(),
      useUserStore: user(),
      useHomeStore: home()
    }
}
