import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Profile () {
    const [profile,setProfile] = useState({});

    const getUser = async (userId) => {
        try {
            const { data } = await axios("/api/users/profile", {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            setProfile(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
        useEffect(() => {
        getUser();
    }, []);

    return (
    
        <div>
            <h1>Profile</h1>
        </div>   
    );
    
};

