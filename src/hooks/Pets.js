import {useEffect, useState} from 'react';
import axios from "axios";

const BACKEND_URL = 'https://demo132.delta.vkhackathon.com/api/';
const backend = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": 'application/json',
        "X-Content-Type-Options": "nosniff",
    },
    withCredentials: true
});

export function usePets(initialPage = 0, initialSize = 10) {
    const [pets, setPets] = useState([]);
    const [props, setProps] = useState({});

    useEffect(() => {
        const {page = initialPage, size = initialSize, genus, sex, city, name, sortField, direction} = props;
        let request = `pets?page=${page}&size=${size}`;
        if (sex) {
            request += `&sex.equals=${sex}`;
        }
        if (name) {
            request += `&name.contains=${name}`;
        }
        if (city) {
            request += `&city.equals=${city}`;
        }
        if (genus) {
            request += `&genus.equals=${genus}`
        }
        if (sortField) {
            request += `&sort=${sortField},${direction ? direction : 'asc'}`;
        }
        backend.get(request)
            .then(({data}) => setPets(data))
            .catch(err => {
                console.error(err);
                setPets([])
            })
    }, [props]);

    return [pets, setProps];
}