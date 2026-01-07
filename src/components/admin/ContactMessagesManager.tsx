"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  expected_guests?: string;
  message: string;
  created_at: string;
}

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contact-messages");
    const json = await res.json();
    if (!res.ok) {
      toast({ title: "Error", description: json?.error || "Could not fetch messages", variant: "destructive" });
      setLoading(false);
      return;
    }

    setMessages(json.data || []);
    setLoading(false);
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="border-b border-gray-200">
        <CardTitle>Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center">Loading messages...</div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 && <div>No messages yet.</div>}
            {messages.map((m) => (
              <div key={m.id} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold">{m.name}</div>
                    <div className="text-sm text-gray-600">{m.email} {m.phone && `· ${m.phone}`}</div>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(m.created_at).toLocaleString()}</div>
                </div>
                <div className="text-sm text-gray-700 mb-2">{m.message}</div>
                <div className="text-xs text-gray-500">
                  {m.event_type && <span className="mr-3">Type: {m.event_type}</span>}
                  {m.event_date && <span className="mr-3">Date: {m.event_date}</span>}
                  {m.expected_guests && <span>Guests: {m.expected_guests}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
