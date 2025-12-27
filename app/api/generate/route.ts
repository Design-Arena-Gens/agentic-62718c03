import { NextResponse } from 'next/server'

const stylePrompts: Record<string, string> = {
  friendly: 'Be warm, friendly, and casual. Use conversational language like you\'re talking to a friend.',
  professional: 'Be polite, professional, and respectful. Use proper grammar and maintain a business-appropriate tone.',
  enthusiastic: 'Be excited and energetic! Use exclamation points and show genuine interest.',
  concise: 'Keep responses brief and to the point. 1-2 sentences maximum.'
}

function generateHumanLikeResponse(message: string, style: string, customPrompt: string): string {
  const lowerMessage = message.toLowerCase()

  // Common greeting responses
  if (lowerMessage.match(/^(hi|hey|hello|yo|sup)/)) {
    const greetings = [
      "Hey! How can I help you?",
      "Hi there! What's up?",
      "Hey! Thanks for reaching out",
      "Hello! How are you doing?",
      "Hey! Good to hear from you"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Questions about availability
  if (lowerMessage.includes('available') || lowerMessage.includes('in stock')) {
    const responses = [
      "Yes, it's still available! What would you like to know about it?",
      "Yep, still have it! Let me know if you have any questions",
      "It is! Feel free to ask me anything about it",
      "Yes it's available! Interested?",
      "Still available! What info do you need?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Price inquiries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    const responses = [
      "The price is listed in the post, but let me know if you have questions!",
      "Check out the post details for pricing info. Happy to negotiate!",
      "Price is in the description! Feel free to DM me an offer",
      "It's listed at [price] - open to reasonable offers though!",
      "See the post for pricing. We can discuss if you're interested!"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Interest expressions
  if (lowerMessage.includes('interested') || lowerMessage.includes('want')) {
    const responses = [
      "Awesome! What would you like to know?",
      "Great! Let me know if you have any questions",
      "Perfect! Feel free to ask anything",
      "Nice! How can I help you with it?",
      "Cool! What do you need to know?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    const responses = [
      "No problem! Let me know if you need anything else",
      "You're welcome! Happy to help",
      "Anytime! Feel free to reach out if you have more questions",
      "Of course! Glad I could help",
      "No worries! Hit me up if you need anything"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Questions
  if (lowerMessage.includes('?')) {
    const responses = [
      "Great question! Let me check on that for you",
      "Good question! I can help with that",
      "Let me get back to you on that shortly",
      "That's a fair question - give me a sec to check",
      "I'll look into that and get back to you ASAP"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Default responses based on style
  const defaultResponses: Record<string, string[]> = {
    friendly: [
      "Thanks for the message! What's on your mind?",
      "Hey! I appreciate you reaching out. How can I help?",
      "Thanks for getting in touch! What can I do for you?",
      "Hey there! What can I help you with?",
      "Thanks for the DM! Let me know what you need"
    ],
    professional: [
      "Thank you for your message. How may I assist you?",
      "I appreciate you reaching out. How can I help you today?",
      "Thank you for contacting me. What can I do for you?",
      "I received your message. How may I be of assistance?",
      "Thank you for getting in touch. What information do you need?"
    ],
    enthusiastic: [
      "Hey!! Thanks so much for reaching out! How can I help?!",
      "Awesome! Thanks for the message! What can I do for you?!",
      "Hey there! So glad you messaged! What's up?!",
      "Thanks for the DM! I'm excited to help! What do you need?!",
      "Hey! Great to hear from you! How can I assist?!"
    ],
    concise: [
      "Hey! What's up?",
      "Hi! How can I help?",
      "Thanks for reaching out. What do you need?",
      "Hello! What can I do for you?",
      "Hey! Need something?"
    ]
  }

  const styleResponses = defaultResponses[style] || defaultResponses.friendly
  return styleResponses[Math.floor(Math.random() * styleResponses.length)]
}

export async function POST(request: Request) {
  try {
    const { message, style, customPrompt } = await request.json()

    // Generate response based on message content
    const response = generateHumanLikeResponse(message, style || 'friendly', customPrompt || '')

    // Add a small random delay to simulate human typing
    const delay = Math.random() * 1000 + 500
    await new Promise(resolve => setTimeout(resolve, delay))

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
