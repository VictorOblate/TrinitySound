
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Phone, Calendar, Users, MessageCircle, Eye, MarkAsRead } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  expected_guests?: string;
  message: string;
  read: boolean;
  created_at: string;
}

const ContactMessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));

      toast({
        title: "Success",
        description: "Message marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Contact Messages
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages yet</p>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className={`transition-all duration-200 hover:shadow-md ${
                !message.read ? 'border-accent bg-accent/5' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{message.name}</h4>
                        {!message.read && <Badge variant="destructive" className="text-xs">New</Badge>}
                        {message.event_type && (
                          <Badge variant="outline" className="text-xs">{message.event_type}</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {message.phone}
                          </div>
                        )}
                        {message.event_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(message.event_date).toLocaleDateString()}
                          </div>
                        )}
                        {message.expected_guests && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {message.expected_guests}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm line-clamp-2 mb-2">{message.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Message from {message.name}</DialogTitle>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <strong>Email:</strong> {selectedMessage.email}
                                </div>
                                {selectedMessage.phone && (
                                  <div>
                                    <strong>Phone:</strong> {selectedMessage.phone}
                                  </div>
                                )}
                                {selectedMessage.event_type && (
                                  <div>
                                    <strong>Event Type:</strong> {selectedMessage.event_type}
                                  </div>
                                )}
                                {selectedMessage.event_date && (
                                  <div>
                                    <strong>Event Date:</strong> {new Date(selectedMessage.event_date).toLocaleDateString()}
                                  </div>
                                )}
                                {selectedMessage.expected_guests && (
                                  <div>
                                    <strong>Expected Guests:</strong> {selectedMessage.expected_guests}
                                  </div>
                                )}
                                <div>
                                  <strong>Received:</strong> {formatDate(selectedMessage.created_at)}
                                </div>
                              </div>
                              <div>
                                <strong>Message:</strong>
                                <p className="mt-2 p-4 bg-muted rounded-lg">{selectedMessage.message}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {!message.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsRead(message.id)}
                        >
                          <MarkAsRead className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMessagesManager;
