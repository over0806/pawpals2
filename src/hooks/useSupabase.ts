import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Pet, AdoptionRequest, Chat, Message } from '../types';

export const useSupabase = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
    } else {
      setPets(data || []);
    }
    setLoading(false);
  };

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('adoption_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      // Map database fields to camelCase if necessary
      const mappedData = (data || []).map((req: any) => ({
        id: req.id,
        petName: req.pet_name,
        petBreed: req.pet_breed,
        petImage: req.pet_image,
        date: req.date,
        status: req.status,
      }));
      setRequests(mappedData);
    }
    setLoading(false);
  };

  const submitAdoptionRequest = async (request: Omit<AdoptionRequest, 'id'>) => {
    const { data, error } = await supabase
      .from('adoption_requests')
      .insert([
        {
          pet_name: request.petName,
          pet_breed: request.petBreed,
          pet_image: request.petImage,
          date: request.date,
          status: request.status,
        },
      ])
      .select();

    if (error) {
      console.error('Error submitting request:', error);
      return null;
    }
    return data[0];
  };

  useEffect(() => {
    fetchPets();
    fetchRequests();
  }, []);

  return {
    pets,
    requests,
    loading,
    fetchPets,
    fetchRequests,
    submitAdoptionRequest,
  };
};
