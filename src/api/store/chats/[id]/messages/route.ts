import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import sendChatMessageWorkflow from "../../../../../workflows/marketplace/send-chat-message"
import { z } from "@medusajs/framework/zod"

export const StoreSendChatMessageSchema = z.object({
    text: z.string()
})

export const POST = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
    const room_id = req.params.id
    const { text } = req.validatedBody as z.infer<typeof StoreSendChatMessageSchema>
    const customer_id = req.auth_context?.actor_id || "guest"

    const { result } = await sendChatMessageWorkflow(req.scope).run({
        input: {
            room_id,
            sender_type: "customer",
            sender_id: customer_id,
            text
        }
    })

    res.json({ message: result })
}

export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
    const room_id = req.params.id
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: messages } = await query.graph({
        entity: "chat_message",
        fields: ["*", "room.*"],
        filters: { room_id },
    })

    res.json({ messages })
}
