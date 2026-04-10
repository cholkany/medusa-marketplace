const cartRes = await sdk.client.fetch<HttpTypes.StoreCompleteCartResponse>(
    `/store/carts/${id}/complete-vendor`, {
    method: "POST",
    headers,
})
    .then(async (cartRes) => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
        return cartRes
    })
    .catch(medusaError)