import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: [vendorAdmin] } = await query.graph({
        entity: "vendor_admin",
        fields: ["vendor.chat_rooms.*", "vendor.chat_rooms.messages.*"],
        filters: {
            id: [req.auth_context.actor_id],
        },
    })

    res.json({ chat_rooms: (vendorAdmin as any)?.vendor?.chat_rooms || [] })
}
