import {useEffect, useState} from 'react';
import {backend} from './backend';

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