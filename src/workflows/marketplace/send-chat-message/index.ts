import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import sendChatMessageStep from "./steps/send-chat-message"

type WorkflowInput = {
    room_id: string
    sender_type: "customer" | "vendor"
    sender_id: string
    text: string
}

const sendChatMessageWorkflow = createWorkflow(
    "send-chat-message",
    function (input: WorkflowInput) {
        const message = sendChatMessageStep(input)
        
        return new WorkflowResponse(message)
    }
)

export default sendChatMessageWorkflow
