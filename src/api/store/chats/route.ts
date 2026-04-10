import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import createChatRoomWorkflow from "../../../workflows/marketplace/create-chat-room"
import { z } from "@medusajs/framework/zod"

export const StoreCreateChatRoomSchema = z.object({
    vendor_id: z.string(),
    product_id: z.string().optional()
})

export const POST = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
    const { vendor_id, product_id } = req.validatedBody as z.infer<typeof StoreCreateChatRoomSchema>
    const customer_id = req.auth_context?.actor_id || "guest" // Or grab from customer session

    const { result } = await createChatRoomWorkflow(req.scope).run({
        input: {
            customer_id,
            vendor_id,
            product_id
        }
    })

    res.json({ chat_room: result })
}

export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
    const customer_id = req.auth_context?.actor_id || "guest"
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: chat_rooms } = await query.graph({
        entity: "chat_room",
        fields: ["*", "vendor.*", "messages.*"],
        filters: { customer_id },
    })

    res.json({ chat_rooms })
}
