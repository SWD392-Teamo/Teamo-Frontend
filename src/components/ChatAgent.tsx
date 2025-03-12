'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, Dropdown, Spinner } from 'flowbite-react';
import { HiChat, HiX} from 'react-icons/hi';
import { AiFillMessage, AiOutlineMessage, AiOutlineSend } from 'react-icons/ai';
import { getProjectSuggestions, getSkillImprovement, getTeamRecommendations } from '@/actions/agentAction';
import { formatAgentResponse } from '@/utils/formatAgentResponse';
import DropdownSelect from '@/components/DropdownSelect';

  //=================================================
  //      MESSAGE TYPES AND PREDEFINED MESSAGE
  //=================================================

type Message = {
    content: string;
    isUser: boolean;
    timestamp: Date;
};

// Initial guide message of what to prompt
const INITIAL_MESSAGES = {
    'team-recommendations': 
        'Hello! I can help you find the perfect team members for your project. What kind of team are you looking to build? Give me a brief about your project and the skills you need.',
    'project-suggestions': 
        'Hi there! I can suggest project ideas based on your interests and skills. What skills and interests do you have?',
    'skill-improvement': 
        'Welcome! I can help you improve your skills. What skills do you have and which role are you interested in?'
};

export default function ChatAgent() {

    //=====================================
    //      LOCAL STATE MANAGEMENT
    //=====================================

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<string>('team-recommendations');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const modeOptions = [
        { value: 'team-recommendations', label: 'Team Recommendations' },
        { value: 'project-suggestions', label: 'Project Suggestions' },
        { value: 'skill-improvement', label: 'Skill Improvement' }
      ];


    //=====================================
    //        RENDER DEPENDENCIES
    //=====================================  
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Add mode change message when mode changes
        setMessages(prev => [...prev, {
            content: INITIAL_MESSAGES[mode as keyof typeof INITIAL_MESSAGES],
            isUser: false,
            timestamp: new Date()
        }]);
    }, [mode]);


    //=====================================
    //          MESSAGE LOGIC
    //=====================================
    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Add user message
        setIsLoading(true);
        const userMessage: Message = {
            content: input,
            isUser: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Add loading message
        const loadingMessage: Message = {
            content: '...',
            isUser: false,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, loadingMessage]);
        
        setInput('');

        await handleGenerateResponse();
    };

    async function handleGenerateResponse() {
        try {
            let response: any;

            // Check mode and generate with different context
            switch (mode) {
                case 'team-recommendations':
                    response = await getTeamRecommendations(input);
                    break;
                case 'project-suggestions':
                    response = await getProjectSuggestions(input);
                    break;
                case 'skill-improvement':
                    response = await getSkillImprovement(input);
                    break;
            }

            // Remove loading message and add bot response
            setMessages(prev => {
                const newMessages = prev.slice(0, -1); // Remove loading message
                return [...newMessages, {
                    content: response || 'Sorry, I could not process your request.',
                    isUser: false,
                    timestamp: new Date()
                }];
            });
        } catch (error) {
            // Remove loading message and add error message
            setMessages(prev => {
                const newMessages = prev.slice(0, -1); // Remove loading message
                return [...newMessages, {
                    content: 'Sorry, something went wrong. Please try again.',
                    isUser: false,
                    timestamp: new Date()
                }];
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-white rounded-lg shadow-xl w-[700px] h-[700px] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-lg text-primary font-semibold flex flex-row align-middle">
                            <AiOutlineMessage size={25} className='me-2' />
                            <div>Teamo Assistant</div>
                        </h1>
                        <Button color="gray" size="sm" onClick={() => setIsOpen(false)}>
                            <HiX className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Mode Selector */}
                    <div className="p-2 border-b">
                        <DropdownSelect
                            value={mode || 'team-recommendations'}
                            onChange={(value: string) => setMode(value)}
                            options={modeOptions}
                            placeholder="Select Mode"
                        />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        message.isUser
                                            ? 'bg-primary text-tertiary'
                                            : 'bg-gray-100 text-gray-900'
                                    }`}
                                >
                                    {message.content === '...' ? (
                                        <div className="flex flex-row">
                                            <Spinner size="sm" className="me-2" />
                                            <div>Assistant is thinking...</div>
                                        </div>
                                    ) : (
                                        <div 
                                            dangerouslySetInnerHTML={{ 
                                                __html: formatAgentResponse(message.content) 
                                            }} 
                                            className={`prose prose-sm max-w-none ${
                                                message.isUser 
                                                    ? 'text-tertiary' 
                                                    : ''
                                            }`}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <TextInput
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button onClick={handleSend} 
                                    disabled={isLoading} 
                                    className="bg-primary text-tertiary">
                                <AiOutlineSend className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <Button onClick={() => setIsOpen(true)} 
                        className="btn btn--primary btn--round">
                    <AiFillMessage size={30} />
                </Button>
            )}
        </div>
    );
}