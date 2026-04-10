import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import createChatRoomStep from "./steps/create-chat-room"

type WorkflowInput = {
    customer_id: string
    vendor_id: string
    product_id?: string
}

const createChatRoomWorkflow = createWorkflow(
    "create-chat-room",
    function (input: WorkflowInput) {
        const room = createChatRoomStep(input)
        
        return new WorkflowResponse(room)
    }
)

export default createChatRoomWorkflow
