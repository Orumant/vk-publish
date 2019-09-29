import {useEffect, useState} from 'react';
import {backend} from './backend';

export function useShelters(initialPage) {
    const [shelters, setShelters] = useState([]);
    const [props, setProps] = useState({});

    useEffect(() => {
        const {page = initialPage, size = 20, city} = props;
        let request = `shelters?page=${page}&size=${size}`;

        if (city) {
            request += `&city.equals=${city}`
        }

        backend.get(request)
            .then(({data}) => setShelters(data))
            .catch(err => {
                console.error(err);
                setShelters([])
            })
    }, [props]);

    return [shelters, setProps]
}