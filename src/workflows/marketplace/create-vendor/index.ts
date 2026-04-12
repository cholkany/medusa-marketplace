import {
    createWorkflow,
    WorkflowResponse,
    transform,
} from "@medusajs/framework/workflows-sdk"
import {
    setAuthAppMetadataStep,
    useQueryGraphStep,
} from "@medusajs/medusa/core-flows"
import createVendorAdminStep from "./steps/create-vendor-admin"
import createVendorStep from "./steps/create-vendor"

export type CreateVendorWorkflowInput = {
    name: string
    handle?: string
    logo?: string
    description?: string
    category?: string
    instagram?: string
    twitter?: string
    facebook?: string
    website?: string
    contact_email?: string
    contact_phone?: string
    address?: string
    city?: string
    country?: string
    return_policy?: string
    shipping_policy?: string
    privacy_policy?: string
    admin: {
        email: string
        first_name?: string
        last_name?: string
    }
    authIdentityId: string
}

const createVendorWorkflow = createWorkflow(
    "create-vendor",
    function (input: CreateVendorWorkflowInput) {
        const vendor = createVendorStep({
            name: input.name,
            handle: input.handle,
            logo: input.logo,
            description: input.description,
            category: input.category,
            instagram: input.instagram,
            twitter: input.twitter,
            facebook: input.facebook,
            website: input.website,
            contact_email: input.contact_email,
            contact_phone: input.contact_phone,
            address: input.address,
            city: input.city,
            country: input.country,
            return_policy: input.return_policy,
            shipping_policy: input.shipping_policy,
            privacy_policy: input.privacy_policy,
        })

        const vendorAdminData = transform({
            input,
            vendor,
        }, (data) => {
            return {
                ...data.input.admin,
                vendor_id: data.vendor.id,
            }
        })

        const vendorAdmin = createVendorAdminStep(
            vendorAdminData
        )

        setAuthAppMetadataStep({
            authIdentityId: input.authIdentityId,
            actorType: "vendor",
            value: vendorAdmin.id,
        })
        // @ts-ignore
        const { data: vendorWithAdmin } = useQueryGraphStep({
            entity: "vendor",
            fields: [
                "id", "name", "handle", "logo",
                "description", "category",
                "instagram", "twitter", "facebook", "website",
                "contact_email", "contact_phone",
                "address", "city", "country",
                "return_policy", "shipping_policy", "privacy_policy",
                "admins.*",
            ],
            filters: {
                id: vendor.id,
            },
        })

        return new WorkflowResponse({
            vendor: vendorWithAdmin[0],
        })
    }
)

export default createVendorWorkflow