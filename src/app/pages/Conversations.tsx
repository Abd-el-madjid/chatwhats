import { useState } from 'react';
import { Search, Send, Phone, MoreVertical, CheckCheck } from 'lucide-react';
import { conversations, messages } from '../data/mockData';
import { format } from 'date-fns';

export function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0].id);
  const [messageInput, setMessageInput] = useState('');

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // In a real app, this would send the message
    setMessageInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
        <p className="text-gray-600 mt-1">Manage WhatsApp conversations with your customers.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation === conversation.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">
                        {conversation.customerName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 text-sm truncate">
                          {conversation.customerName}
                        </span>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {format(new Date(conversation.lastMessageTime), 'HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {currentConversation.customerName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentConversation.customerName}</p>
                      <p className="text-xs text-gray-500">{currentConversation.customerPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === 'customer'
                            ? 'bg-white border border-gray-200'
                            : message.sender === 'system'
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`text-xs ${message.sender === 'assistant' ? 'text-green-100' : 'text-gray-500'}`}>
                            {format(new Date(message.timestamp), 'HH:mm')}
                          </span>
                          {message.sender === 'assistant' && (
                            <CheckCheck className="w-3 h-3 text-green-100" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
