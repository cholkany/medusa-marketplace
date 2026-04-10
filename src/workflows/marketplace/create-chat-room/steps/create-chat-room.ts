import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import MarketplaceModuleService from "../../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../../modules/marketplace"

type CreateChatRoomInput = {
    customer_id: string
    vendor_id: string
    product_id?: string
}

const createChatRoomStep = createStep(
    "create-chat-room",
    async (data: CreateChatRoomInput, { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        const room = await marketplaceModuleService.createChatRooms(data)

        return new StepResponse(room, room.id)
    },
    async (roomId, { container }) => {
        if (!roomId) return

        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        await marketplaceModuleService.deleteChatRooms(roomId)
    }
)

export default createChatRoomStep
