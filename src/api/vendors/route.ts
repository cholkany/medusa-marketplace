import {
    AuthenticatedMedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { z } from "@medusajs/framework/zod"
import createVendorWorkflow, {
    CreateVendorWorkflowInput,
} from "../../workflows/marketplace/create-vendor"

export const PostVendorCreateSchema = z.object({
    name: z.string(),
    handle: z.string().optional(),
    logo: z.string().optional(),
    // Shop profile fields (flattened from storefront "metadata")
    description: z.string().optional(),
    category: z.string().optional(),
    // Social links
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
    // Contact info
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    // Policies
    return_policy: z.string().optional(),
    shipping_policy: z.string().optional(),
    privacy_policy: z.string().optional(),
    admin: z.object({
        email: z.string(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
    }),
})

type RequestBody = z.infer<typeof PostVendorCreateSchema>

export const POST = async (
    req: AuthenticatedMedusaRequest<RequestBody>,
    res: MedusaResponse
) => {
    // If `actor_id` is present, the request carries 
    // authentication for an existing vendor admin
    if (req.auth_context?.actor_id) {
        throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Request already authenticated as a vendor."
        )
    }

    const {
        name,
        handle,
        logo,
        description,
        category,
        instagram,
        twitter,
        facebook,
        website,
        contact_email,
        contact_phone,
        address,
        city,
        country,
        return_policy,
        shipping_policy,
        privacy_policy,
        admin,
    } = req.validatedBody

    // create vendor admin
    const { result } = await createVendorWorkflow(req.scope)
        .run({
            input: {
                name,
                handle,
                logo,
                description,
                category,
                instagram,
                twitter,
                facebook,
                website,
                contact_email,
                contact_phone,
                address,
                city,
                country,
                return_policy,
                shipping_policy,
                privacy_policy,
                admin,
                authIdentityId: req.auth_context.auth_identity_id,
            } as CreateVendorWorkflowInput,
        })

    res.json({
        vendor: result.vendor,
    })
}