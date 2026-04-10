import { MedusaService } from "@medusajs/framework/utils"
import Vendor from "./models/vendor"
import VendorAdmin from "./models/vendor-admin"
import ChatRoom from "./models/chat-room"
import ChatMessage from "./models/chat-message"

class MarketplaceModuleService extends MedusaService({
    Vendor,
    VendorAdmin,
    ChatRoom,
    ChatMessage,
}) { }

export default MarketplaceModuleService