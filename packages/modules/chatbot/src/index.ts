import { defineCommerceModule, type CommerceModule } from '@zwantum/module-sdk';

export interface ChatbotConfig {
  aiProvider: 'gemini' | 'openai' | 'custom';
  modelName: string;
  enableOrderTracking: boolean;
  enableProductDiscovery: boolean;
  storePolicyContext?: string;
}

export const chatbotModule: CommerceModule<ChatbotConfig> = defineCommerceModule<ChatbotConfig>({
  manifest: {
    id: 'module-chatbot',
    name: 'AI Commerce Assistant',
    version: '1.0.0',
    description: 'Conversational AI chatbot assisting customers with product discovery and FAQs.',
    author: 'Zwantum Commerce Team',
    permissions: ['chatbot:read', 'chatbot:configure'],
  },
  getAdminNavigation() {
    return [
      {
        id: 'ai-chatbot',
        label: 'AI Assistant',
        path: '/admin/modules/chatbot',
        requiredPermission: 'settings:read',
      },
    ];
  },
});

export default chatbotModule;
