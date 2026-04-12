import {
    defineMiddlewares,
    authenticate,
    validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostVendorCreateSchema } from "./vendors/route"
import { PatchVendorMeSchema } from "./vendors/me/route"
import { AdminCreateProduct } from "@medusajs/medusa/api/admin/products/validators"
import { StoreCreateChatRoomSchema } from "./store/chats/route"
import { StoreSendChatMessageSchema } from "./store/chats/[id]/messages/route"
import { VendorSendChatMessageSchema } from "./vendors/chats/[id]/messages/route"

import cors from "cors"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/vendors*",
            middlewares: [
                cors({
                    origin: ["http://localhost:3000", "http://localhost:8000"],
                    credentials: true,
                }),
            ],
        },
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
            matcher: "/vendors/me",
            method: ["PATCH"],
            middlewares: [
                authenticate("vendor", ["session", "bearer"]),
                validateAndTransformBody(PatchVendorMeSchema),
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