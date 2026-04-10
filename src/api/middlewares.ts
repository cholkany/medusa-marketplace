import {
    defineMiddlewares,
    authenticate,
    validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostVendorCreateSchema } from "./vendors/route"
import { AdminCreateProduct } from "@medusajs/medusa/api/admin/products/validators"
import { StoreCreateChatRoomSchema } from "./store/chats/route"
import { StoreSendChatMessageSchema } from "./store/chats/[id]/messages/route"
import { VendorSendChatMessageSchema } from "./vendors/chats/[id]/messages/route"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/vendors",
            method: ["POST"],
            middlewares: [
                authenticate("vendor", ["session", "bearer"], {
                    allowUnregistered: true,
                }),
                validateAndTransformBody(PostVendorCreateSchema),
            ],
        },
        {
            matcher: "/vendors/*",
            middlewares: [
                authenticate("vendor", ["session", "bearer"]),
            ],
        },
        {
            matcher: "/vendors/products",
            method: ["POST"],
            middlewares: [
                validateAndTransformBody(AdminCreateProduct),
            ],
        },
        {
            matcher: "/store/chats",
            method: ["POST"],
            middlewares: [
                validateAndTransformBody(StoreCreateChatRoomSchema),
            ],
        },
        {
            matcher: "/store/chats/*/messages",
            method: ["POST"],
            middlewares: [
                validateAndTransformBody(StoreSendChatMessageSchema),
            ],
        },
        {
            matcher: "/vendors/chats/*/messages",
            method: ["POST"],
            middlewares: [
                validateAndTransformBody(VendorSendChatMessageSchema),
            ],
        },
    ],
})