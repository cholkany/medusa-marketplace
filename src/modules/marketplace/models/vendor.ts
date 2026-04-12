import { model } from "@medusajs/framework/utils"
import VendorAdmin from "./vendor-admin"
import ChatRoom from "./chat-room"

const Vendor = model.define("vendor", {
    id: model.id().primaryKey(),
    handle: model.text().unique(),
    name: model.text(),
    logo: model.text().nullable(),
    // Shop profile fields
    description: model.text().nullable(),
    category: model.text().nullable(),
    // Social links
    instagram: model.text().nullable(),
    twitter: model.text().nullable(),
    facebook: model.text().nullable(),
    website: model.text().nullable(),
    // Contact info
    contact_email: model.text().nullable(),
    contact_phone: model.text().nullable(),
    address: model.text().nullable(),
    city: model.text().nullable(),
    country: model.text().nullable(),
    // Policies
    return_policy: model.text().nullable(),
    shipping_policy: model.text().nullable(),
    privacy_policy: model.text().nullable(),
    admins: model.hasMany(() => VendorAdmin, {
        mappedBy: "vendor",
    }),
    chat_rooms: model.hasMany(() => ChatRoom, {
        mappedBy: "vendor",
    }),
})

export default Vendor