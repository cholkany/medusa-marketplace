import {
    AuthenticatedMedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { MARKETPLACE_MODULE } from "../../../modules/marketplace"
import MarketplaceModuleService from "../../../modules/marketplace/service"

const VENDOR_FIELDS = [
    "id", "name", "handle", "logo",
    "description", "category",
    "instagram", "twitter", "facebook", "website",
    "contact_email", "contact_phone",
    "address", "city", "country",
    "return_policy", "shipping_policy", "privacy_policy",
    "created_at", "updated_at",
]

// ── GET /vendors/me ──────────────────────────────────────────────────────────
// Returns the vendor shop belonging to the authenticated vendor admin.

export const GET = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: [vendorAdmin] } = await query.graph({
        entity: "vendor_admin",
        fields: VENDOR_FIELDS.map((f) => `vendor.${f}`),
        filters: {
            id: [req.auth_context.actor_id],
        },
    })

    res.json({
        vendor: vendorAdmin?.vendor ?? null,
    })
}

// ── PATCH /vendors/me ────────────────────────────────────────────────────────
// Updates the vendor shop belonging to the authenticated vendor admin.

export const PatchVendorMeSchema = z.object({
    name: z.string().optional(),
    handle: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    return_policy: z.string().optional(),
    shipping_policy: z.string().optional(),
    privacy_policy: z.string().optional(),
})

type PatchBody = z.infer<typeof PatchVendorMeSchema>

export const PATCH = async (
    req: AuthenticatedMedusaRequest<PatchBody>,
    res: MedusaResponse
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    const marketplaceService: MarketplaceModuleService =
        req.scope.resolve(MARKETPLACE_MODULE)

    // Resolve vendor id from the authenticated vendor admin
    const { data: [vendorAdmin] } = await query.graph({
        entity: "vendor_admin",
        fields: ["vendor.id"],
        filters: {
            id: [req.auth_context.actor_id],
        },
    })

    const vendorId = vendorAdmin?.vendor?.id
    if (!vendorId) {
        res.status(404).json({ message: "Vendor not found for this admin." })
        return
    }

    const updated = await marketplaceService.updateVendors({
        id: vendorId,
        ...req.validatedBody,
    })

    res.json({ vendor: updated })
}
