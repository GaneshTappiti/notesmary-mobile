
import { useState, useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useRealtimeSubscription<T>(
  tableName: string,
  options: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    schema?: string;
    filter?: string;
    filterValue?: string;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { event = '*', schema = 'public', filter, filterValue } = options;

  useEffect(() => {
    const channelName = `realtime-${tableName}-${Math.random().toString(36).slice(2, 9)}`;
    
    // Create and subscribe to the channel
    const newChannel = supabase.channel(channelName);
    
    // First add the presence event listener
    newChannel.on('presence', { event: 'sync' }, () => {
      setIsConnected(true);
    });
    
    // Then add the postgres changes listener as a separate operation
    newChannel.on(
      'postgres_changes',
      { 
        event, 
        schema, 
        table: tableName,
        ...(filter && filterValue ? { filter: `${filter}=eq.${filterValue}` } : {})
      },
      (payload) => {
        console.log('Realtime update:', payload);
        
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        if (eventType === 'INSERT') {
          setData(prev => [...prev, newRecord as T]);
        } else if (eventType === 'UPDATE') {
          setData(prev => prev.map(item => 
            // @ts-ignore
            item.id === newRecord.id ? { ...item, ...newRecord } : item
          ));
        } else if (eventType === 'DELETE') {
          setData(prev => prev.filter(item => 
            // @ts-ignore
            item.id !== oldRecord.id
          ));
        }
      }
    );
    
    // Subscribe to the channel after setting up all event handlers
    newChannel.subscribe(status => {
      if (status !== 'SUBSCRIBED') {
        setError(new Error(`Failed to subscribe to realtime updates: ${status}`));
        setIsConnected(false);
      } else {
        setIsConnected(true);
        setError(null);
      }
    });

    setChannel(newChannel);

    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [tableName, event, schema, filter, filterValue]);

  return {
    data,
    setData,
    isConnected,
    error,
    channel
  };
}
