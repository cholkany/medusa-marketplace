import { model } from "@medusajs/framework/utils"
import Vendor from "./vendor"
import ChatMessage from "./chat-message"

const ChatRoom = model.define("chat_room", {
    id: model.id().primaryKey(),
    customer_id: model.text(),
    product_id: model.text().nullable(),
    vendor: model.belongsTo(() => Vendor, {
        mappedBy: "chat_rooms",
    }),
    messages: model.hasMany(() => ChatMessage, {
        mappedBy: "room",
    })
})

export default ChatRoom
