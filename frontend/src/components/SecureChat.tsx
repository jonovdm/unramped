import { useEffect, useState } from 'react';
import { Button, Input, InputAdornment, Modal, Paper, Typography, TextField, Stack } from '@mui/material';
import useXMTPClient from '../hooks/useXMTPClient';
import { Conversation, DecodedMessage } from '@xmtp/xmtp-js';

interface SecureChatProps {
    isOpen: boolean;
    isLoading?: boolean;
    orderID: string;
    peer: string;
    peerNickname: string;
    onClose: () => void;
}

const SecureChat = ({ isOpen, orderID, peerNickname, peer, onClose }: SecureChatProps) => {
    const xmtpClient = useXMTPClient();
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<DecodedMessage[]>([]);
    const [text, setText] = useState('');

    const onSend = async () => {
        conversation?.send(text);
        setText('');
    };

    useEffect(() => {
        console.log(xmtpClient)
        if (!xmtpClient) {
            return;
        }

        xmtpClient.conversations.newConversation(peer).then((conversation) => {
            setConversation(conversation);
            conversation.messages().then(setMessages);
        });

    }, [xmtpClient, peer]);

    useEffect(() => {
        if (!conversation) {
            return;
        }

        // Function to stream new messages in the conversation
        const streamMessages = async () => {
            const newStream = await conversation.streamMessages();
            for await (const msg of newStream) {
                const exists = messages.find((m) => m.id === msg.id);
                if (!exists) {
                    setMessages((prevMessages) => [...prevMessages, msg]);
                }
            }
        };
        streamMessages();
    }, [conversation, messages]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Paper>
                <Typography variant="h6" sx={{ m: 2 }}>{"Order ID: " + orderID}</Typography>
                <Stack sx={{ m: 2 }}>
                    {
                        messages.filter(
                            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
                        ).map((msg) => (
                            <Stack key={`chatmsg-${msg.id}`} direction="row" justifyContent="center" alignItems="center" sx={{ m: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {msg.senderAddress.toLowerCase() === peer.toLowerCase() ? peerNickname : 'You'}
                                </Typography>
                                <Typography variant="body1">{msg.content}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ m: 2 }}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Hello..."
                        value={text}
                        onKeyDown={(e) => e.key === 'Enter' && onSend()}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button variant="contained" size="small" color="primary" onClick={onSend}>
                                        Send
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Paper>
        </Modal>
    );
};

export default SecureChat;
