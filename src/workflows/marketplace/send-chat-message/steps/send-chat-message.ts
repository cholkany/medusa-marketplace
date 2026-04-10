import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import MarketplaceModuleService from "../../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../../modules/marketplace"

type SendChatMessageInput = {
    room_id: string
    sender_type: "customer" | "vendor"
    sender_id: string
    text: string
}

const sendChatMessageStep = createStep(
    "send-chat-message",
    async (data: SendChatMessageInput, { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        const message = await marketplaceModuleService.createChatMessages(data)

        return new StepResponse(message, message.id)
    },
    async (messageId, { container }) => {
        if (!messageId) return

        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        await marketplaceModuleService.deleteChatMessages(messageId)
    }
)

export default sendChatMessageStep
