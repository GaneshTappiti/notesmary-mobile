
import { useState, useEffect } from 'react';
import { RealtimeChannel, RealtimeChannelOptions } from '@supabase/supabase-js';
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
    
    try {
      // Create a new channel
      const channel = supabase.channel(channelName);
      
      // Set up presence event
      channel.on('presence', { event: 'sync' }, () => {
        setIsConnected(true);
      });
      
      // Set up postgres changes event - using the correct type assertion
      channel.on(
        'postgres_changes' as any,
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
      
      // Subscribe to the channel
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setError(null);
        } else {
          setError(new Error(`Failed to subscribe to realtime updates: ${status}`));
          setIsConnected(false);
        }
      });

      setChannel(channel);

      // Cleanup: remove the channel when component unmounts
      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.error("Error setting up realtime subscription:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return () => {};
    }
  }, [tableName, event, schema, filter, filterValue]);

  return {
    data,
    setData,
    isConnected,
    error,
    channel
  };
}
