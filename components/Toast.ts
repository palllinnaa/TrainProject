import { toast } from "react-toastify"
import { MESSAGE_TYPE } from "../server/constants"

export const showMessage = (message: string, messageType: string) => {
  if (message && messageType) {
    const typeOfMessage = messageType.split("_")
    const type = typeOfMessage[typeOfMessage.length - 1]
    const customToastId = message.replace(/\s/g, '-')
    if (type === "TOAST") {
      messageType === MESSAGE_TYPE.SUCCEEDED_TOAST ?
        toast.success(message, { toastId: customToastId, autoClose: 2000, draggablePercent: 60 }) :
        messageType === MESSAGE_TYPE.INFORMATION_TOAST ?
          toast.info(message, { toastId: customToastId, autoClose: 2000, draggablePercent: 60 }) :
          toast.error(message, { toastId: customToastId, autoClose: 2000, draggablePercent: 60 })
    } else if (type === "CONSOLE") {
      messageType === MESSAGE_TYPE.SUCCEEDED_CONSOLE ?
        console.log('✅ MESSAGE: ', message) :
        messageType === MESSAGE_TYPE.INFORMATION_CONSOLE ?
          console.log('📑 MESSAGE: ', message) :
          console.log('❗ MESSAGE: ', message)
    }
  }
}
