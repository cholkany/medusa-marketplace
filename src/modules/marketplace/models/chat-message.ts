import { model } from "@medusajs/framework/utils"
import ChatRoom from "./chat-room"

const ChatMessage = model.define("chat_message", {
    id: model.id().primaryKey(),
    room: model.belongsTo(() => ChatRoom, {
        mappedBy: "messages",
    }),
    sender_type: model.enum(["customer", "vendor"]),
    sender_id: model.text(),
    text: model.text(),
})

export default ChatMessage
