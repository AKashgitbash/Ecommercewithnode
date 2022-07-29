import React, { useState, useEffect } from 'react';
import { ServerURL, getData } from '../FetchNodeservice'
export default function DisplayALL(props) {
    const [getlist, setlist] = useState([])

    const fetchData = async () => {
        var result = await getData('category/fetchallcategory')
        setlist(result)
    }

    useEffect(function () {
        fetchData()

    }, [])

    const displayResult = () => {
        return (

            getlist.map((item, index) => {
                return (<div>
                    {item.categoryid}{item.categoryname}
                </div>)

            })
        )
    }
    return (<div>
        {displayResult()}

    </div>)
}