'use client'

import { useState } from 'react'
import { MessageCircle, Settings, Activity, Send, User } from 'lucide-react'

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
  isBot: boolean
}

interface Conversation {
  username: string
  lastMessage: string
  unread: number
  messages: Message[]
}

export default function Home() {
  const [isActive, setIsActive] = useState(false)
  const [responseStyle, setResponseStyle] = useState('friendly')
  const [responseDelay, setResponseDelay] = useState(3)
  const [customPrompt, setCustomPrompt] = useState('You are a friendly and helpful assistant. Respond naturally and conversationally.')
  const [selectedConvo, setSelectedConvo] = useState<string | null>(null)
  const [testMessage, setTestMessage] = useState('')
  const [testResponse, setTestResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      username: 'john_doe',
      lastMessage: 'Hey! Is this available?',
      unread: 1,
      messages: [
        {
          id: '1',
          sender: 'john_doe',
          text: 'Hey! Is this available?',
          timestamp: new Date(),
          isBot: false
        }
      ]
    },
    {
      username: 'sarah_smith',
      lastMessage: 'Thanks for the quick reply!',
      unread: 0,
      messages: [
        {
          id: '1',
          sender: 'sarah_smith',
          text: 'Hi! I saw your post',
          timestamp: new Date(Date.now() - 3600000),
          isBot: false
        },
        {
          id: '2',
          sender: 'bot',
          text: 'Hey! Thanks for reaching out. How can I help you today?',
          timestamp: new Date(Date.now() - 3500000),
          isBot: true
        },
        {
          id: '3',
          sender: 'sarah_smith',
          text: 'Thanks for the quick reply!',
          timestamp: new Date(Date.now() - 3400000),
          isBot: false
        }
      ]
    }
  ])

  const generateResponse = async (message: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          style: responseStyle,
          customPrompt
        })
      })
      const data = await response.json()
      setTestResponse(data.response)
    } catch (error) {
      setTestResponse('Error generating response. Please try again.')
    }
    setIsGenerating(false)
  }

  const handleTestMessage = () => {
    if (testMessage.trim()) {
      generateResponse(testMessage)
    }
  }

  const selectedConversation = conversations.find(c => c.username === selectedConvo)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange p-3 rounded-xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-instagram-purple to-instagram-pink bg-clip-text text-transparent">
                  Instagram Auto DM Agent
                </h1>
                <p className="text-gray-600">AI-powered human-like responses</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Activity className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`font-semibold ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-instagram-purple to-instagram-pink text-white hover:shadow-lg'
                }`}
              >
                {isActive ? 'Stop Bot' : 'Start Bot'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-6 h-6 text-instagram-purple" />
              <h2 className="text-xl font-bold">Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Response Style</label>
                <select
                  value={responseStyle}
                  onChange={(e) => setResponseStyle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-purple focus:border-transparent"
                >
                  <option value="friendly">Friendly & Casual</option>
                  <option value="professional">Professional</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="concise">Short & Concise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Response Delay (seconds): {responseDelay}s
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={responseDelay}
                  onChange={(e) => setResponseDelay(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Adds human-like delay before responding</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Custom AI Prompt</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-purple focus:border-transparent resize-none"
                  placeholder="Customize how the AI responds..."
                />
              </div>

              {/* Test Response */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold mb-2">Test Message</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-purple focus:border-transparent"
                    placeholder="Test a message..."
                  />
                  <button
                    onClick={handleTestMessage}
                    disabled={isGenerating || !testMessage.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-instagram-purple to-instagram-pink text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {testResponse && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{testResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">Recent Conversations</h2>
            <div className="space-y-2">
              {conversations.map((convo) => (
                <button
                  key={convo.username}
                  onClick={() => setSelectedConvo(convo.username)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedConvo === convo.username
                      ? 'bg-gradient-to-r from-instagram-purple/10 to-instagram-pink/10 border-2 border-instagram-purple'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-instagram-purple" />
                      <span className="font-semibold">{convo.username}</span>
                    </div>
                    {convo.unread > 0 && (
                      <span className="bg-instagram-pink text-white text-xs px-2 py-1 rounded-full">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Messages View */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedConversation ? `@${selectedConversation.username}` : 'Select a conversation'}
            </h2>
            {selectedConversation ? (
              <div className="space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        msg.isBot
                          ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isBot ? 'text-white/70' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Messages', value: '247', color: 'purple' },
            { label: 'Auto Replies', value: '189', color: 'pink' },
            { label: 'Response Rate', value: '95%', color: 'orange' },
            { label: 'Avg Response Time', value: '4.2s', color: 'yellow' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 text-instagram-${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
