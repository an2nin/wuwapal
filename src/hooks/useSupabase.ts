import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const useSupabase = (tableName: string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from(tableName).select("*");
            if (error) throw error;
            setData(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataByUnique = async (col: string, val: any) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select("*")
                .eq(col, val)
                .limit(1)
                .single();

            if (error) throw error;
            setData(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const insertData = async (newData: any) => {
        setError(null);
        try {
            const { data: any, error } = await supabase
                .from(tableName)
                .insert(newData);
            if (error) throw error;
            setData((prevData: any) => [...prevData, ...data]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const upsertData = async (newData: any, onConflict: any) => {
        setError(null);
        try {
            const { data: any, error } = await supabase
                .from(tableName)
                .upsert(newData, { onConflict });
            if (error) throw error;
            setData((prevData: any) => [...prevData, ...data]);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateData = async (id: any, updatedData: any) => {
        setError(null);
        try {
            const { data: any, error } = await supabase
                .from(tableName)
                .update(updatedData)
                .eq("id", id);
            if (error) throw error;
            setData((prevData: any) =>
                prevData.map((item: any) => (item.id === id ? data[0] : item))
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    const deleteData = async (id: any) => {
        setError(null);
        try {
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq("id", id);
            if (error) throw error;
            setData((prevData: any) =>
                prevData.filter((item: any) => item.id !== id)
            );
        } catch (error: any) {
            setError(error.message);
        }
    };

    return {
        data,
        loading,
        error,
        insertData,
        updateData,
        deleteData,
        fetchData,
        upsertData,
        fetchDataByUnique,
    };
};

export default useSupabase;
